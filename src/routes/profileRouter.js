const express = require("express");
const { authUserToken } = require("../middlewares/authToken");

const profileRouter = express.Router();

profileRouter.get("/profile", authUserToken, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
