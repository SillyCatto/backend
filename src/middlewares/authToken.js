const { validateToken } = require("../utils/jwt");
const User = require("../models/user");

const authUserToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "Please login first" });
    }

    const { _id } = validateToken(token);

    const user = await User.findById(_id);
    if (!user) throw new Error("User not found");

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  authUserToken,
};
