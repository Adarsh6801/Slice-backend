const jwt=require('jsonwebtoken')
module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorizaion.splir(' ')[1];
        jwt.verify(token, "DRmyHrN7NoMuXD2JUmpr4snPAODVP4fWitxmwFdEdo9nLra4YZm3Z3NZAWXGcMZ7xbvOGzFSZYrg5D2YvsXR9WNTfuPvsYcWpA2y")
        next()
    }catch(err){
        res.status(401).json({message:"failed"})
    }
    
}