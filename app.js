const express = require("express");
const path=require('path');
const cookieParser =require('cookie-parser');
var bodyParser = require('body-parser')
const mongoose=require('mongoose');


const usersRouter=require('./routes/user');
const adminRouter=require('./routes/admin');


const app=express();

app.use(bodyParser.json())
app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Oringin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,POST,PATCH,DELETE,OPTIONS'
    );
    next();
  });


  app.use('/',usersRouter);
app.use('/admin',adminRouter);

mongoose.connect("mongodb://localhost:27017",()=>{
    console.log("Mogodb is connected");
},
e=>console.error(e)
)

const PORT =4111;
app.listen(PORT, console.log("Server don start for port: " + PORT))