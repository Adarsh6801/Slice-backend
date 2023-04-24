const mongoose= require('mongoose')
//user schema
const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    
    password:{
        type:String
    },
    status:{
        type:Boolean,
        default:true,
    },
    
},{ timestamps: true });

let User=mongoose.model('User',UserSchema);
module.exports=User;