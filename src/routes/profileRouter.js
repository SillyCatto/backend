const express = require("express");
const { authUserToken } = require("../middlewares/authToken");
const User = require("../models/user");

const profileRouter = express.Router();

profileRouter.get("/:userID", authUserToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    if (!user) throw new Error("Invalid user ID");

    const profileData = {
      userID: user._id,
      name: user.name,
      age: user.age,
      gender: user.gender,
      bio: user.bio,
      photoURL: user.photoURL,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    res.json({ profile: profileData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = profileRouter;
