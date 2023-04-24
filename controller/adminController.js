const express = require("express");
const Users= require('../model/userModel')
const Admin =require('../model/adminModel')
const jwt =require('jsonwebtoken')

module.exports={
    adminLogin:async (req,res)=>{
        let admin=await Admin.findOne()
        if(admin.email==req.body.email){
 
         if(admin.password==req.body.password){
            const token = jwt.sign(
                { admin: admin.email, adminId: admin._id },
               "DRmyHrN7NoMuXD2JUmpr4snPAODVP4fWitxmwFdEdo9nLra4YZm3Z3NZAWXGcMZ7xbvOGzFSZYrg5D2YvsXR9WNTfuPvsYcWpA2y",
                {
                  expiresIn: "1h",
                }
              )
             res.status(200).json({ adminVerify: "true" ,token});
 
         }
         else{
             res
             .json({ pmessage: "Password is not currect",password:"false" });
         }
 
        }else{
         res
             .json({ emessage: "Email is not currect",email:"false" });
        }
    },
    viewUsers:async (req,res)=>{
        allUsers=await Users.find({})
        console.log(allUsers,'allUsers'); 
        if(allUsers.length==0){
            res
            .status(200)
            .json({ message: "There is no Users" });
        }else{
            res
              .status(200)
              .json({message: "succesful", allUsers });
        }
    },
    blockUser:async (req,res)=>{
        console.log(req.query.id);
        let user=await Users.findByIdAndUpdate({_id:req.query.id},{status:false})
        console.log(user,'asdfasdfadfafafaf');
        res.send({})
    },
    unblockUser:async (req,res)=>{
        console.log(req.query.id,'req.query.idreq.query.idreq.query.idreq.query.id');
        await Users.findByIdAndUpdate({_id:req.query.id},{status:true})
        res.json({})
    },
    deleteUser: async(req,res)=>{
        await Users.findByIdAndDelete({_id:req.query.id})
    }
}