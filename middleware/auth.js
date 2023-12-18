const jwt = require('jsonwebtoken')
const UserModel= require('../models/user')


const checkuserauth = async (req,res,next)=>{
    // console.log('hello')
    const {token}=(req.cookies)
    // console.log(token)
    if(!token){
        req.flash("error", "UnauthoriZed user"); //flash is used for showing msg
        res.redirect("/");
    }else{
         const verifyToken = jwt.verify(token,'himanshipachouri1234')
        //  console.log(verify)
        const data = await UserModel.findOne({_id:verifyToken.ID})
        req.data1 = data
        next()
    }
}

module.exports= checkuserauth