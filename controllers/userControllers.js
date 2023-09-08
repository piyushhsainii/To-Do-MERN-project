const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/userModels.js')
 const getAllUsers = async (req,res)=>{


}
const login = async (req,res)=>{

    const {email,password} = req.body
    let user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(404).send('User doesnt exist')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(404).send('Password dont Match')
    }
    const Token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
    // console.log("token",Token)
    res.status(201).cookie('Token', Token, {
        maxAge: 15 * 60 * 1000,
        httpOnly:true,
        // sameSite:'none',
        // secure:true
        sameSite:process.env.NODE_ENV === "DEVELOPMENT"? 'lax' :'none',
        secure:process.env.NODE_ENV === "DEVELOPMENT"? false : true
    }).json({
        sucess: true,
        message: 'Registered sucessfull'
    })
}
const register = async(req,res)=>{
    const {name,email,password} = req.body
    console.log(req.body)
    let user = await User.findOne({email})

    if(user){
        return res.status(200).send(
            'User already exists'
        )
        }
        const HashedPassword = await bcrypt.hash(password, 1);
         user = await User.create({
            name,email, password:HashedPassword
        })

        const Token =  jwt.sign({_id:user._id},process.env.SECRET_KEY)
        res.status(201).cookie('Token',Token,{
            httpOnly:true,
            maxAge:35000000,
            sameSite:process.env.NODE_ENV === "DEVELOPMENT"? 'lax' :'none',
            secure:process.env.NODE_ENV === "DEVELOPMENT"? false : true,
  
        }).json({
            sucess:true,
            message:'Registered sucessfull'
        })
    
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
    console.log(req.cookies, 'LMAO')
    const decode = jwt.verify(Token,process.env.SECRET_KEY)     
    req.user = await User.findById(decode)
    res.status(200).send(
        [req.user.name,
        req.user.email]
   )
}

const logout = (req, res) => {
    console.log(req.cookies);
    // Calculate a past date (e.g., 1 millisecond ago)
    const pastDate = new Date(0);

    res.status(200).cookie("Token", "", {
        httpOnly: true,
        expires: pastDate, // Set the expiration date to a past date
        sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? 'lax' : 'none',
        secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    }).json({ mess: 'User has been logged out' });
}

module.exports = {getAllUsers,login,register,isAuthenticated,getProfile, logout,isAuthenticated}
