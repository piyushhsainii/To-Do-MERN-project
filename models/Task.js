const  mongoose = require("mongoose")

const Data = new mongoose.Schema({
    Title:{
        type: mongoose.Schema.Types.String,
        required:true,
    },
    Description:{
        type: mongoose.Schema.Types.String,
       required:true,
    },
    isCompleted:{
       type:Boolean,
       default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt :{
        type:Date,
        default:Date.now,
    }
});

const Task = mongoose.model('Task', Data)

module.exports = {Task}

 