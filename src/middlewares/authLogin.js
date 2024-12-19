const User = require("../models/user");

const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    req.body.user = user;
    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  authUser,
};
