const express = require('express')
const { userRegister, userLogin } = require('../controllers/userAuthController')
const { userHome } = require('../controllers/userController')
const { userAuth } = require('../middlewares/authMiddleware')
const router = express.Router()

/*--------------------User Register-------------*/
router.post('/register',userRegister)

/*-------------------User Login---------------*/
router.post('/login',userLogin)

/*------------------User Home----------------- */
router.get('/home',userAuth,userHome)

/*-------------------User list-------------*/
router.get('/subject/list',userAuth)


module.exports = router