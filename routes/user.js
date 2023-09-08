const Express = require('express')
const {getAllUsers,login,register,isAuthenticated,getProfile, logout} = require('../controllers/userControllers.js')
const router = Express.Router();
 

router.get('/users/all', getAllUsers)


router.post('/register', register)  
router.post('/login', login)  
router.get('/logout',logout)
router.get('/getProfile',isAuthenticated,getProfile)

// router.route('/userid/:id') //dynamic routes should be put in last 
// .get(getUserId)


module.exports = router