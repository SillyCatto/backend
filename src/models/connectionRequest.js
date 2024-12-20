const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    receiverID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["like", "pass", "accepted", "rejected"],
        message: `{VALUE} is invalid status type`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;

  if (connectionRequest.senderID.equals(connectionRequest.receiverID))
    throw new Error("cannot send request to yourself");

  next();
});

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequest;
