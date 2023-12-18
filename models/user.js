const mongoose = require ('mongoose')
// create schema
const UserSchema = new mongoose.Schema({
    n:{
        type:String,
        Require:true
    },
    e:{
        type:String,
        Require:true
    },
    p:{
        type:String,
        Require:true
    },
    image:{
         public_id:{
            type:String
         },
         url:{
            type:String
         },
    },
    role:{
        type:String,
        default:'student'
    }
   
},{timestamps:true})

const UserModel = mongoose.model('user',UserSchema)   //collection name,  userschema name

module.exports = UserModel