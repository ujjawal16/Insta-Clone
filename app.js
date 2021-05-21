const express=require('express')
const app=express()
const PORT=process.env.PORT||5000
const mongoose=require('mongoose')
const { MONGOURI } = require('./config/keys')

mongoose.connect(MONGOURI,{ useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.connection.on("connected",()=>{
    console.log("connected to mongo")
})
mongoose.connection.on("error",(err)=>{
    console.log("error connecting",err)
})
 
require('./models/user')
require('./models/post')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production")
{
    app.use(express.static('instaclone/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'instaclone','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("PORT is running on",PORT)
})