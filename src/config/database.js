require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  await mongoose.connect(uri);
};

module.exports = connectDB;
