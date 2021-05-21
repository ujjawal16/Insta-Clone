const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const  userSchema= new mongoose.Schema({
    name:{
        type:String,
        requiired:true
    },
    email:{
        type:String,
        requiired:true
    },
    password:{
        type:String,
        requiired:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/ujjawal16/image/upload/v1621614949/noimage-1536x1536_fdf2ia.png"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})
mongoose.model('User',userSchema)