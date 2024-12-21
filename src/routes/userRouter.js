const express = require("express");
const { authUserToken } = require("../middlewares/authToken");
const ConnectionRequest = require("../models/connectionRequest");
const {
  validateProfileEditInput,
} = require("../middlewares/validateProfileInput");

const userRouter = express.Router();

userRouter.get("/profile", authUserToken, async (req, res) => {
  try {
    const profileData = {
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
    res.json({ profile: profileData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

userRouter.patch(
  "/profile/edit",
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

userRouter.get("/request/pending", authUserToken, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const data = await ConnectionRequest.find({
      receiverID: loggedInUser._id,
      status: "like",
    }).populate("senderID", ["name", "photoURL", "age", "gender", "bio"]);

    if (data.length === 0) {
      res.status(404).json({ message: "No requests pending" });
    } else {
      res.json({ data: data });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

userRouter.get("/connections", authUserToken, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const acceptedRequests = await ConnectionRequest.find({
      $or: [
        { senderID: loggedInUser._id, status: "accepted" },
        { receiverID: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("senderID", ["name", "photoURL", "age", "gender", "bio"])
      .populate("receiverID", ["name", "photoURL", "age", "gender", "bio"]);

    const connectedUsers = acceptedRequests.map((request) => {
      if (request.senderID._id.equals(loggedInUser._id)) {
        return request.receiverID;
      } else {
        return request.senderID;
      }
    });

    if (connectedUsers.length === 0) {
      res.status(404).json({ message: "You don't have any connections" });
    } else {
      res.json({ data: connectedUsers });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = userRouter;
