const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const mongoose = require('mongoose')
const userRouter = require("./routes/user.js")
const TaskRouter = require("./routes/task.js")
 require('dotenv').config()
const cors = require('cors')


//connecting database 

// mongoose.connect(process.env.MODEL_URI).then(()=>{
//     console.log('Datbase Connected')
// })

//using middleware to accept data from forms
app.use(cors());

app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({extended:true}))



// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your frontend URL
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

//USING ROUTES
// app.post("/register",(req,res)=>{
//      console.log("getting req at register router");
//      const { name, email, password } = req.body;
//      console.log(name,email,password)
//      res.send({"status":"success"})
// });
app.use(userRouter)
app.use(TaskRouter); 

app.get('/',(req,res)=>{
    console.log("getting req")
    res.send('nice')
})


app.listen(8080,()=>{
    console.log('Server started on port 8080')
})