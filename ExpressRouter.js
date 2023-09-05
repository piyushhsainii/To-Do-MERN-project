const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const mongoose = require('mongoose')
const userRouter = require("./routes/user.js")
const TaskRouter = require("./routes/task.js")
 require('dotenv').config()
const cors = require('cors')

app.use(cors());
//connecting database 

mongoose.connect(process.env.MODEL_URI).then(()=>{
    console.log('Datbase Connected')
})

//using middleware to accept data from forms
// app.use(cors({
//     origin:"http://localhost:5173",
//     methods:["GET","POST","PUT","DELETE"],
//     credentials:true 
// }))




app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({extended:true}))


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL); // Replace with your frontend URL
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

//USING ROUTES
app.use(userRouter);
app.use(TaskRouter); 

app.get('/',(req,res)=>{
    res.send('nice')
})


app.listen(process.env.PORT,()=>{
    console.log('Server started')
})