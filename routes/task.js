const express =require('express')
const {isAuthenticated} = require('../controllers/userControllers')
const {newTask,myTask,updateTask,deleteTask} = require('../controllers/task.js')
const router = express.Router();    

router.post('/new',isAuthenticated,newTask)
router.get('/my',isAuthenticated,myTask)
router.route('/:id')
.put(isAuthenticated,updateTask)
.delete(isAuthenticated,deleteTask)

module.exports = router