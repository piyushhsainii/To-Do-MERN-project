const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const mongoose = require('mongoose')
const userRouter = require("./routes/user.js")
const TaskRouter = require("./routes/task.js")
const {config} = require('dotenv')
const cors = require('cors')
//connecting database 

config({
    path:'./data/config.env'
})

mongoose.connect(process.env.MODEL_URI).then(()=>{
    console.log('Datbase Connected')
})

//using middleware to accept data from forms

app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true 
}))

//USING ROUTES
app.use(userRouter);
app.use(TaskRouter); 

app.get('/',(req,res)=>{
    res.send('nice')
})


app.listen(process.env.PORT,()=>{
    console.log('Server started')
})