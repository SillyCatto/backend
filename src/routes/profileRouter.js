const express = require("express");
const { authUserToken } = require("../middlewares/authToken");
const {
  validateProfileEditInput,
} = require("../middlewares/validateProfileInput");

const profileRouter = express.Router();

profileRouter.get("/view", authUserToken, async (req, res) => {
  try {
    const viewOwnProfileData = {
      userID: req.user._id,
      name: req.user.name,
      email: req.user.email,
      age: req.user.age,
      gender: req.user.gender,
      bio: req.user.bio,
      photoURL: req.user.photoURL,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    };
    res.json({ profile: viewOwnProfileData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

profileRouter.patch(
  "/edit",
  authUserToken,
  validateProfileEditInput,
  async (req, res) => {
    try {
      const loggedInUser = req.user;

      Object.keys(req.body).forEach(
        (key) => (loggedInUser[key] = req.body[key]),
      );

      await loggedInUser.save();
      res.json({ message: "Profile updated successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
);

module.exports = profileRouter;
