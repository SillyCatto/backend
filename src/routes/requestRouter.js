const express = require("express");

const { authUserToken } = require("../middlewares/authToken");
const ConnectionRequest = require("../models/connectionRequest");
const { validateSendRequest } = require("../middlewares/validateRequestInput");

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

module.exports = requestRouter;
