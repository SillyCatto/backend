const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { generateToken } = require("../utils/jwt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: [3, "User name must be at least 3 characters"],
      maxlength: [50, "User name must be maximum 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    age: {
      type: Number,
      min: [18, "You must be at least 18 to signup"],
      max: [100, "Please enter a valid age"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function () {
  return await generateToken(this._id);
};

userSchema.methods.checkPassword = async function (inputPassword) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(inputPassword, passwordHash);

  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
