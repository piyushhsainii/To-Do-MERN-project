const {Task}= require("../models/Task.js");
const { User } = require("../models/userModels.js");

 const newTask = async(req,res)=>{
    const {Title,Description} = req.body
    try { 
        // Ensure req.user contains a valid user ID
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

         await Task.create({
            Title:Title,
            Description:Description,
            user: req.user ,
        });

        res.status(201).json({
            success: true,
            message: 'TASK CREATED',
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating task',
            error: error.message
        });
    }
}

const myTask = async (req,res)=>{
const userid = req.user._id
console.log(userid)
const task = await Task.find({user:userid})
res.json(task)
}

const updateTask = async (req,res)=>{
    const {id} = req.params
    console.log(id)
    const task = await Task.findById(id);
    task.isCompleted = !task.isCompleted
    await task.save()
    res.json({
        sucess:true,
        message:'DONE'
    });

}

const deleteTask = async(req,res)=>{
    const {id} =req.params;
    const task = await Task.findById(id)
    await task.deleteOne()
    console.log(id)
    res.json({
        sucess:true,
        message:'DONE'
    });


}

module.exports = {newTask,myTask,updateTask,deleteTask}
