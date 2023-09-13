const {Task}= require("../models/Task.js");
const { User } = require("../models/userModels.js");

 const newTask = async(req,res)=>{
    const {Title,Description} = req.body
    try { 
        // Ensure req.user contains a valid user ID
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'LOGIN FIRST'
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
    try {
        const {id} = req.params
        const task = await Task.findById(id);
        console.log(task)
        task.isCompleted = !task.isCompleted
        await task.save()
        res.json({
            sucess:true,
            message:'DONE'
        });
    } catch (error) {
        console.log(error)
    }

}

const deleteTask = async(req,res)=>{
    const {id} =req.params;
    const task = await Task.findById(id)
    await task.deleteOne()
    res.json({
        sucess:true,
        message:'DONE'
    });


}

module.exports = {newTask,myTask,updateTask,deleteTask}
