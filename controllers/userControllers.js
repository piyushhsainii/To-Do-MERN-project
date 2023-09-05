const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/userModels.js')

 const getAllUsers = async (req,res)=>{


}
const login = async (req,res)=>{
  const { email, password } = req.body;
  
      let user = await User.findOne({email}).select('+password');
      if(!user){
          return res.status(404).send('User doesnt exist')
      }
      const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch){
          return res.status(404).send('SAME ERROR')
      }
      const Token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
      console.log(req.cookies)
      res.status(201).cookie('Token', Token, {
          httpOnly: true,
          sameSite:process.env.NODE_ENV === "DEVELOPMENT"? 'lax' :'none',
          secure:process.env.NODE_ENV === "DEVELOPMENT"? false : true
      }).json({
          sucess: true,
          message: 'Registered sucessfull'
      })
   }
   const register = async(req,res)=>{

       console.log("getting req at register router");
       const { name, email, password } = req.body;
       console.log(name,email,password)
       res.send({"status":"success"})

     console.log("getting req at register router");
  //     const {name,email,password} = req.body
    //   let user = await User.findOne({email})

    //   if(user){
    //       return res.status(404).send(
    //           'User already exists'
    //       )
    //       }
    //       const HashedPassword = await bcrypt.hash(password, 10);
    //        user = await User.create({
    //           name,email, password:HashedPassword
    //       })

    //       const Token =  jwt.sign({_id:user._id},process.env.SECRET_KEY)

    //       res.status(201).cookie('Token',Token,{
    //           // expires: new Date(Date.now()*10000),
    //           maxAge:35000000,
    //           sameSite:process.env.NODE_ENV === "DEVELOPMENT"? 'lax' :'none',
    //           secure:process.env.NODE_ENV === "DEVELOPMENT"? false : true
    //       }).json({
    //           sucess:true,
    //           message:'Registered sucessfull'
    //      })
}

const isAuthenticated = async (req,res,next)=>{
 const {Token} = req.cookies
 if(!Token){
    return res.json({
            sucess:true,
            mess : 'Login First'
    })
 }
 const decode = jwt.verify(Token,process.env.SECRET_KEY)     
 req.user = await User.findById(decode)
next()
}

const getProfile  = async (req,res)=>{   
    const {Token} = req.cookies
    const decode = jwt.verify(Token,process.env.SECRET_KEY)     
    req.user = await User.findById(decode)
    // console.log(req.user)
    res.status(200).send(
        [req.user.name,
        req.user.email]
   )
}

const logout = (req,res)=>{
    const {Token} = req.cookies
    if(Token) {
        res.cookie("Token",null,{
            expires: new Date(Date.now()),
            sameSite:process.env.NODE_ENV === "DEVELOPMENT"? 'lax' :'none',
            secure:process.env.NODE_ENV === "DEVELOPMENT"? false : true
        })
        res.send('User has been logged out')
    }
}

module.exports = {getAllUsers,login,register,isAuthenticated,getProfile, logout,isAuthenticated}
