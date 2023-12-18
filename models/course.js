const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name:{
        type:String,
        Require:true,
    },
    email:{
        type:String,
        Require:true,
    },
    phone:{
        type:Number,
        Require:true
    },
    city:{
        type:String,
        Require:true
    },
    address:{
        type:String,
        Require:true
    },
    course:{
        type:String,
        require:true
     },
     user_id:{
        type:String,
        require:true,
     },
    status: {
        type:String,
        default:'pending'
    },
    comment:{
        type:String,
    }
},{timestamps:true})

const CourseModel = new mongoose.model('course',CourseSchema)

module.exports=CourseModel