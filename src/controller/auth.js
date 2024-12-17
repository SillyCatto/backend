const bcrypt = require("bcrypt");
const User = require("../models/user");

const authUser = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  return isPasswordValid;
};

module.exports = {
  authUser,
};
