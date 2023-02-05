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
              res
              .status(200)
              .json({status:"true", message: "new User added successfully", result });
        }
            
        }catch(err){
            res
            .status(500)
            .json({ message: "error occured while adding a new user", error: err });

        }
    },


}