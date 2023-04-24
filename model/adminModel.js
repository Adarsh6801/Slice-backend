const mongoose= require('mongoose')
const AdminSchema=new mongoose.Schema({
 
    email:{
        type:String
    },
    
    password:{
        type:String
    },
    active:{
        type:Boolean,
        default:true,
    }
},{ timestamps: true });

let Admins=mongoose.model('Admins',AdminSchema);
module.exports=Admins;