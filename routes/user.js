const { Router } = require('express');
const express=require('express');
const router=express.Router();
const userController=require('../controller/userController');
const {userRegister}=require('../controller/userController');

router.post('/userRegister',userController.userRegister)



module.exports=router;