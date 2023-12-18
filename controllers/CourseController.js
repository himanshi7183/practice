const CourseModel = require("../models/course");
const nodemailer = require('nodemailer')  //mail send krne k lie use hota hai

class CourseController {
  static courseInsert = async (req, res) => {
    try {
      const{id} = req.data1
      const { name, email, phone, city, course,address} = req.body;
      const result = new CourseModel({
        name: name,
        email:email,
        phone: phone,
        city:city,
        address: address,
        course: course,
        user_id:id
      });
      await result.save();

      this.sendEmail(name,email,course)
      req.flash('success',"Course registration successfully")
      res.redirect("/course_display");
    } catch (error) {
      console.log(error);
    }
  };

  static courseDisplay = async (req, res) => {
    try {
      const {n,image,id} = req.data1  // yha jo y n,id,e,image likha hai wo user.js m jo hai wo waale hai
      const data = await CourseModel.find({user_id:id});
      // console.log(data)
      res.render("courseDisplay",{ d:data,msg:req.flash('success'),name:n,image:image});
    } catch (error) {
      console.log(error);
    }
  };

  static courseView = async (req, res) => {
    try {
      const data = await CourseModel.findById(req.params.id);
      const {n,image,id,e} = req.data1  // yha jo y n,id,e,image likha hai wo user.js m jo hai wo waale hai
      // console.log(data);
      res.render("courseView", { d: data ,name:n,image:image});
    } catch (error) {
      console.log(error);
    }
  };
  static courseEdit = async (req, res) => {
    try {
      const data = await CourseModel.findById(req.params._id);
      const {n,_id,e,image} = req.data1  // yha jo y n,id,e,image likha hai wo user.js m jo hai wo waale hai
      console.log(data);
      res.render("courseEdit", { d: data ,name:n,image:image});
    } catch (error) {
      console.log(error);
    }
  };

  static courseUpdate = async (req, res) => {
    try {
      const data = await CourseModel.findByIdAndUpdate(req.params._id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        city: req.body.city,
        address: req.body.address,
        course: req.body.course,
      });
      req.flash('success',"updated successfully")
      res.redirect("/course_display");
    } catch (error) {
      console.log(error);
    }
  };

  static courseDelete = async (req, res) => {
    try {
      await CourseModel.findByIdAndDelete(req.params.id);
      req.flash('success',"Delete successfully")
      res.redirect("/course_display");
    } catch (err) {
      console.log(err);
    }
  };

  static sendEmail = async (name,email,course) => {
    // console.log(name,email,course)
       
    //connenct with the smtp server

    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "himanshipachouri@gmail.com",
        pass: "mnev yzcz exuk ocwi",
      },
});
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: `Course registration successfully,Please wait for approval`, // Subject line
      text: "heelo", // plain text body
      html: `<b>${name}</b> Registration for <b>${course}</b> successful! `, // html body
    });
  };

}

module.exports = CourseController;
