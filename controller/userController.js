const express = require("express");
const jwt =require('jsonwebtoken')
const bcrypt =require('bcrypt')
const User= require("../model/userModel")

const { response } = require("express");
require('dotenv').config()


module.exports ={
    userRegister: async (req,res)=>{
        try{
            console.log(req.body);
      
            const salt=await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const emailExists= await User.findOne({email:req.body.email})
            console.log(hashedPassword,"hashedPassword");
        console.log(emailExists,"emailExistsemailExistsemailExists");
        if(emailExists){
            res.json({message:"The email already exists",emailExists:true});
        }
        else{
            const { firstName, lastName, email} = req.body;
            console.log(firstName, lastName, email);
            const result = await User.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
              });
              console.log(result,"kjkdfhsfk");
              const token = jwt.sign(
                { name: result.firstName, userid: result._id },
               "DRmyHrN7NoMuXD2JUmpr4snPAODVP4fWitxmwFdEdo9nLra4YZm3Z3NZAWXGcMZ7xbvOGzFSZYrg5D2YvsXR9WNTfuPvsYcWpA2y",
                {
                  expiresIn: "1h",
                }
              );
              res
              .status(200)
              .json({status:"true", message: "new User added successfully", result ,token});
        }
            
        }catch(err){
            res
            .status(500)
            .json({ message: "error occured while adding a new user", error: err });

        }
    },
    userLogin:async(req,res)=>{
       try{
        console.log('available users');
        const user = await User.findOne({ email: req.body.email });
        if (!user){
            res.status(401).json({ message: "cannot find user" });
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
          console.log("hiiiii");
          console.log(user,'user user');
            //Generating token after user password is authenticated (JWT)
            const token = jwt.sign(
              { name: user.firstName, userid: user._id },
             "DRmyHrN7NoMuXD2JUmpr4snPAODVP4fWitxmwFdEdo9nLra4YZm3Z3NZAWXGcMZ7xbvOGzFSZYrg5D2YvsXR9WNTfuPvsYcWpA2y",
              {
                expiresIn: "1h",
              }
            );
            console.log(token,'adfasfadfadf___f');
            res.status(200).json({ token });
          } else {
            res.status(401).json({ message: "wrong password" });
          }
       }catch(err){

       }
    },
    userProfile:async(req,res)=>{
     try{
      console.log("hiiii");
      console.log(req.query.id,'adsfjhgakdsjhjfg');
      const id=req.query.id
     const user= await User.findById(id)
      res.status(200)
      .json({message:"user is verfied",user})
     }catch(err){
      
     }
    },
    uploadPhoto:async(req,res)=>{
      try{
        const file = req.file;
        console.log(file,'fileeeeee');
        if (!file) {
          const error = new Error('Please upload a file');
          error.httpStatusCode = 400;
          return next(error);
        }
        res.send(file);
      }catch(err){

      }
    }


}