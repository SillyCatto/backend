const express = require("express");

const { authUserToken } = require("../middlewares/authToken");
const ConnectionRequest = require("../models/connectionRequest");
const {
  validateSendRequest,
  validateReviewRequest,
} = require("../middlewares/validateRequestInput");

const requestRouter = express.Router();

requestRouter.post(
  "/send/:status/:receiverID",
  authUserToken,
  validateSendRequest,
  async (req, res) => {
    try {
      const senderID = req.user._id;
      const receiverID = req.params.receiverID;
      const status = req.params.status;

      const connectionRequest = new ConnectionRequest({
        senderID,
        receiverID,
        status,
      });

      const requestData = await connectionRequest.save();

      let message;
      if (status === "like") {
        message = req.user.name + " likes " + req.receiver.name;
      } else {
        message = req.user.name + " ignored " + req.receiver.name;
      }

      res.json({
        message: message,
        data: requestData,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
);

requestRouter.post(
  "/review/:status/:requestID",
  authUserToken,
  validateReviewRequest,
  async (req, res) => {
    try {
      req.pendingRequest.status = req.params.status;
      const data = await req.pendingRequest.save();

      res.json({
        message: "Request " + req.params.status,
        data: data,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
);

requestRouter.get("/pending", authUserToken, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const data = await ConnectionRequest.find({
      receiverID: loggedInUser._id,
      status: "like",
    });

    if (data.length === 0) {
      res.status(404).json({ message: "No requests pending" });
    } else {
      res.json({ data: data });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = requestRouter;
