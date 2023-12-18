const express = require('express')
const FrontController = require('../controllers/FrontController')
const CourseController = require('../controllers/CourseController')
const router = express.Router()   //call Routerfunction which is stored in express
const checkuserauth = require('../middleware/auth')
// const islogin = require('../middleware/islogin')
const AdminController = require('../controllers/Admin/AdminController')

router.get('/', FrontController.login)
router.post('/verify_login',FrontController.verifylogin)

router.get('/registration',FrontController.registration)
router.post('/user_insert',FrontController.userInsert)

router.get('/dashboard',checkuserauth, FrontController.dashboard)
router.get('/about',checkuserauth,FrontController.about)
router.get('/contact',checkuserauth,FrontController.contact)


router.post('/course_insert',checkuserauth, CourseController.courseInsert)
router.get('/course_display',checkuserauth,CourseController.courseDisplay)
router.get('/courseview/:id',checkuserauth,CourseController.courseView)
router.get('/courseedit/:id',checkuserauth,CourseController.courseEdit)
router.post('/course_update/:id',checkuserauth,CourseController.courseUpdate)
router.get('/coursedelete/:id',checkuserauth,CourseController.courseDelete)

router.get('/logout',FrontController.logout)

// profile
router.get('/profile',checkuserauth,FrontController.profile)
// update profile
router.post('/update_profile',checkuserauth,FrontController.updateProfile)
// update password
router.post('/update_password',checkuserauth,FrontController.updatePassword)


// admin controller
router.get('/Admin/getAllData',checkuserauth,AdminController.getAllData)
// update status
router.post('/updateStatus/:id',checkuserauth, AdminController.updatestatus)




module.exports=router