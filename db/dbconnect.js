const mongoose = require("mongoose");
const url = "mongodb://0.0.0.0:27017/practice";
const liveurl =
  'mongodb+srv://himanshipachouri:Himanshi7183@cluster0.m4lzjcg.mongodb.net/?retryWrites=true&w=majority';
const connectdb = () => {
  return mongoose
    .connect(liveurl)
    .then(() => {
      console.log("connected db successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectdb;
