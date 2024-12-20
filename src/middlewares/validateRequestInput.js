const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");

const validateSendRequest = async (req, res, next) => {
  try {
    const senderID = req.user._id;
    const receiverID = req.params.receiverID;
    const status = req.params.status;

    if (senderID.toString() === receiverID.toString())
      throw new Error("cannot send request to yourself");

    // check if the receiver even exist in user db
    const receiver = await User.findById(receiverID);
    if (!receiver) throw new Error("Invalid receiver ID");

    // if receiver exist, attach it to req
    req.receiver = receiver;

    // check if send status is valid
    const allowedSendRequestStatus = ["like", "pass"];
    const isSendingRequestAllowed = allowedSendRequestStatus.includes(status);
    if (!isSendingRequestAllowed) throw new Error("Invalid request status");

    // check if a request already exist
    const connectionRequestExist = await ConnectionRequest.findOne({
      $or: [
        { senderID: senderID, receiverID: receiverID },
        { senderID: receiverID, receiverID: senderID },
      ],
    });

    if (connectionRequestExist)
      throw new Error("A request with this user already exist");

    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  validateSendRequest,
};
