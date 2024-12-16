const bcrypt = require("bcrypt");
const User = require("../models/user");

const authUser = async (email, password) => {
  let isEmailValid = false;

  const user = await User.findOne({ email: email });
  if (user) {
    isEmailValid = true;
  }

  let isPasswordValid = await bcrypt.compare(password, user.password);

  return isEmailValid && isPasswordValid;
};

module.exports = {
  authUser,
};
