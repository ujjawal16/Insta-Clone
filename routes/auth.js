const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require("../config/keys")
const requireLogin=require("../middleware/requireLogin")

router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello")
})

router.post('/signup',(req,res)=>{
    const {name,email,password,pic}=req.body
    if(!email||!password||!name)
    {
        return res.status(422).json({error:"Please enter all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser)
        {
            return res.status(422).json({error:"User already exists"})
        }
        bcrypt.hash(password,12)
        .then(hashedPassword=>{
            const user=new User({
                name,
                email,
                password:hashedPassword,
                pic
            })
            user.save()
            .then(user=>{
                res.json({message:"Saved Successfully"})
            })
            .catch(err=>{
                console.log(err)
            })

        })
        
    }).catch(err=>{
        console.log(err)
    
})
})

router.post('/login',(req,res)=>{
    const {email,password}=req.body
    if(!email||!password)
    {
        return res.status(422).json({error:"Please enter both the fields"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({err:"Invalid email "})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch)
            {
                //res.json({message:"Successfully Logged In"})

                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic}=savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else
            {
                return res.status(422).json({error:"Invalid Password"})
            }
        })
    }).catch(err=>{console.log(err)})
})

module.exports=router;