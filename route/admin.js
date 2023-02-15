const express = require('express')
const { adminLogin } = require('../controllers/adminAuthController')
const {  home, createCourse, updateCourse, deleteCourse, courseList, userApprovalList, userApproval, scheduleCourse } = require('../controllers/adminController')
const { adminAuth } = require('../middlewares/authMiddleware')
const router = express.Router()


/*........................home page...................*/
router.get('/',adminAuth , home)

/*........................login page...................*/
router.post('/login', adminLogin)

/*.....................Course create...................*/
router.post('/course/create',adminAuth , createCourse)

/*.....................Course Update...................*/
router.patch('/course/update/:id',adminAuth , updateCourse)

/*....................Course Delete...................*/
router.delete('/course/delete/:id',adminAuth , deleteCourse)

/*....................Course List...................*/
router.get('/courses' ,adminAuth , courseList)


/*................aproval list................*/
router.get('/userApproval/list',adminAuth, userApprovalList)

/*----------------user approval--------------- */
router.patch('/userAproval/approve/:id',adminAuth,userApproval)
/*....................Schedule Courses...................*/
router.post('/scheduleCourse/:id' , adminAuth , scheduleCourse )


module.exports = router