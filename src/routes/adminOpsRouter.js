const express = require("express");
const User = require("../models/user");

const adminOpsRouter = express.Router();

adminOpsRouter.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong :(");
  }
});

adminOpsRouter.delete("/deleteUserByName", async (req, res) => {
  const username = req.body.name;

  try {
    const deletedUser = await User.findOneAndDelete({ name: username });
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong :(");
  }
});

module.exports = adminOpsRouter;
