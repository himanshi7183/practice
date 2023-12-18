const CourseModel = require('../../models/course')
const nodemailer = require('nodemailer')  //mail send krne k lie use hota hai

class AdminController{
     static getAllData = async (req,res)=>{
              try {
                const{n,image,id}=req.data1
                const data = await CourseModel.find()
                console.log(data)
                res.render('Admin/getAllData',{name:n,image:image,d:data})
              } catch (error) {
                console.log(error)
              }
     }

     static updatestatus = async(req,res)=>{
      try {
        // console.log(req.body)
        const{name,email,comment,status}=req.body
        await CourseModel.findByIdAndUpdate(req.params.id,{
          comment:comment,
          status:status
        })
        this.sendEmail(name,email,status,comment)
        res.redirect('/Admin/getAllData')
      } catch (error) {
        console.log(error)
      }
     }

     static sendEmail = async (name,email,status,comment) => {
      // console.log(name,email,status,comment)
         
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
        to:"pachourihimanshi219@gmail.com" , // list of receivers
        subject: `Course  ${status}`, // Subject line
        text: "heelo", // plain text body
        html: `<b>${name}</b> course <b>${status}</b> successful! `, // html body
      });
  };
}  //end Admincontroller

module.exports= AdminController