const { Router } = require('express');
const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const {userRegister}=require('../controller/userController');
const checkUser=require('../midleware/user-check-auth')

router.post('/userRegister',userController.userRegister)
router.post('/user-login',userController.userLogin)
router.get('/user-profile',userController.userProfile)
router.get('/viewUserProfile',userController.userProfile)
router.post('/upload-photo',userController.uploadPhoto)

module.exports=router;