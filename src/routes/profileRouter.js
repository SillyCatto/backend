const express = require("express");
const { authUserToken } = require("../middlewares/authToken");
const { validateProfileEditInput } = require("../middlewares/validateInput");

const profileRouter = express.Router();

profileRouter.get("/view", authUserToken, async (req, res) => {
  try {
    const viewOwnProfileData = {
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
      const currentUser = req.user;

      Object.keys(req.body).forEach(
        (key) => (currentUser[key] = req.body[key]),
      );

      await currentUser.save();
      res.json({ message: "Profile updated successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
);

module.exports = profileRouter;
