const { Router } = require('express');
const express=require('express');
const router=express.Router();
const adminController = require('../controller/adminController')


router.post('/adminLogin',adminController.adminLogin)
router.get('/admin-view-users',adminController.viewUsers)
router.get('/block-user',adminController.blockUser)
router.get('/unblock-user',adminController.unblockUser)
router.get('/delete-user',adminController.deleteUser)
module.exports=router;
