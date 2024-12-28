const express = require("express");
const {
  validateSignupInput,
  validateLoginInput,
} = require("../middlewares/validateAuthInput");
const { encryptPassword } = require("../utils/encryptor");
const User = require("../models/user");
const { authUser } = require("../middlewares/authLogin");

const authRouter = express.Router();

authRouter.post("/signup", validateSignupInput, async (req, res) => {
  try {
    req.body.password = await encryptPassword(req.body.password);

    const user = new User(req.body);

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

authRouter.post("/login", validateLoginInput, authUser, async (req, res) => {
  try {
    const user = req.body.user;
    const token = await user.getJWT();

    const profileData = {
      userID: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      bio: user.bio,
      photoURL: user.photoURL,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res
      .cookie("token", token)
      .json({ message: "Login successful!", user: profileData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("Logout successful");
});

module.exports = authRouter;
