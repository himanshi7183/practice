const UserModel = require("../models/user");
const CourseModel = require("../models/course");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "dxyhdgkjz",
  api_key: "375114287438772",
  api_secret: "2hyAbHhzVn-h4amvY5DXUswEifM",
});

class FrontController {
  static login = async (req, res) => {
    try {
      res.render("login", {
        message: req.flash("success"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static registration = async (req, res) => {
    try {
      res.render("registration", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static dashboard = async (req, res) => {
    try {
      // console.log(req.user)
      const { n, id, e, image } = req.data1; // yha jo y n,id,e,image likha hai wo user.js m jo hai wo waale hai
      const btech = await CourseModel.findOne({
        user_id: id,
        course: "b.tech",
      });
      // console.log(btech);

      const bca = await CourseModel.findOne({ user_id: id, course: "BCA" });
      const mca = await CourseModel.findOne({ user_id: id, course: "MCA" });
      const mtech = await CourseModel.findOne({
        user_id: id,
        course: "m.tech",
      });
      const mba = await CourseModel.findOne({ user_id: id, course: "MBA" });
      const bba = await CourseModel.findOne({ user_id: id, course: "BBA" });

      res.render("dashboard", {
        name: n,
        image: image,
        btech: btech,
        bca: bca,
        mca: mca,
        mtech: mtech,
        mba: mba,
        bba: bba,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { n, _id, e, image } = req.data1;
      res.render("about", { name: n, image: image });
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      const { n, _id, e, image } = req.data1;

      res.render("contact", { name: n, image: image });
    } catch (error) {
      console.log(error);
    }
  };

  //  method-6
  static userInsert = async (req, res) => {
    // console.log(req.files.image)
    const file = req.files.image;
    const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "profileImage",
    });
    // console.log(imageupload);

    const { n, e, p, cp } = req.body;
    const user = await UserModel.findOne({ e: e });
    // console.log(user);
    if (user) {
      req.flash("error", "email already exists");
      res.redirect("/registration");
    } else {
      if (n && e && p && cp) {
        if (p === cp) {
          try {
            const hashpassword = await bcrypt.hash(p, 10);
            const result = new UserModel({
              n: n, //usermodel: name:"n"
              e: e,
              p: hashpassword,
              image: {
                public_id: imageupload.public_id,
                url: imageupload.secure_url,
              },
            });
            await result.save();
            req.flash("success", "registration successfully");
            res.redirect("/");
          } catch (error) {
            console.log(error);
          }
        } else {
          req.flash("error", "password and confirm password does not match");
          res.redirect("/registration");
        }
      } else {
        req.flash("error", "all field are required");
        res.redirect("/registration");
      }
    }
  };

  // method-7
  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { e, p } = req.body;
      if (e && p) {
        const user = await UserModel.findOne({ e: e });
        //  console.log(user)
        if (user != null) {
          const isMatched = await bcrypt.compare(p, user.p);
          //  console.log(isMatched)

          // multiple login
          if (isMatched) {
            if (user.role == "student") {
              const token = jwt.sign({ ID: user.id }, "himanshipachouri1234"); //secret key
              // console.log(token)
              res.cookie("token", token); //y token cookie m jaake store ho jaaega
              res.redirect("/dashboard");
            }
            if (user.role == "admin") {
              // generate token
              const token = jwt.sign({ ID: user.id }, "himanshipachouri1234"); //secret key
              // console.log(token)
              res.cookie("token", token); //y token cookie m jaake store ho jaaega
              res.redirect("/Admin/getAllData");
            }
            // generate token
            const token = jwt.sign({ ID: user.id }, "himanshipachouri1234"); //secret key
            // console.log(token)
            res.cookie("token", token); //y token cookie m jaake store ho jaaega
            res.redirect("/dashboard");
          } else {
            req.flash("error", "Email and Password does not matched,Try again"); //flash is used for showing msg
            res.redirect("/");
          }
        } else {
          req.flash("error", "you are not registered user"); //flash is used for showing msg
          res.redirect("/");
        }
      } else {
        req.flash("error", "All fields are required"); //flash is used for showing msg
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // method-8
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  // method-9
  static profile = async (req, res) => {
    try {
      const { n, image, id, e, phone, course } = req.data1;
      // finding no. of courses of an user
      // const coursesCount = await CourseModel.find({ user_id: id});
      // console.log(coursesCount.length)
      res.render("profile", {
        name: n,
        image: image,
        email: e,
        phone: phone,
        course: course,
        error: req.flash("error"),
        success: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // method 10
  static updatePassword = async (req, res) => {
    try {
      const { n, id, e, image } = req.data1; // yha jo y n,id,e,image likha hai wo user.js m jo hai wo waale hai
      // console.log(req.body);
      const { currentpass, npass, cpass } = req.body;
      if (currentpass && npass && cpass) {
        const user = await UserModel.findById(id);
        const isMatch = await bcrypt.compare(currentpass, user.p);
        if (!isMatch) {
          req.flash("error", "current password is incorrect"); //flash is used for showing msg
          res.redirect("/profile");
        } else {
          if (npass !== cpass) {
            req.flash(
              "error",
              "New Password and Confirm Password does not match"
            ); //flash is used for showing msg
            res.redirect("/profile");
          } else {
            const newHashpassword = await bcrypt.hash(npass, 10);
            await UserModel.findByIdAndUpdate(id, {
              $set: { p: newHashpassword },
            });
            req.flash("success", "update password successfully"); //flash is used for showing msg
            res.redirect("/logout");
          }
        }
      } else {
        req.flash("error", "All fields are required"); //flash is used for showing msg
        res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // method 11
  static updateProfile = async (req, res) => {
    try {
      const { id } = req.data1;
      const { name, email, phone, image } = req.body;

      if (req.files) {
        const user = await UserModel.findById(id);
        const image_id = user.image.public_id;
        await cloudinary.uploader.destroy(image_id);

        const file = req.files.image;
        const imageUpload = await cloudinary.uploader.upload(
          file.tempFilePath,
          { folder: "profileImage" }
        );
     var data = {
          name: name,
          email: email,
          // phone: req.body.phone,
          image: {
            public_id: imageUpload.public_id,
            url: imageUpload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      const updateprofile = await UserModel.findByIdAndUpdate(id, data);
      console.log(updateprofile);
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  };
} //end frontcontroller class

module.exports = FrontController;
