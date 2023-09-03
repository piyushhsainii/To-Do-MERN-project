const  mongoose = require( "mongoose")

const Data = new mongoose.Schema({
    name:String,
    email:{
       required:true,
       type: String,
       unique:true,
    },
    password:{
       type:String,
       select:false,
       required:true,
    },
    createdAt :{
        type:Date,
        default:Date.now,
    }
});

const User = mongoose.model('User', Data)

module.exports = {User}

 