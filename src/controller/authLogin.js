const bcrypt = require("bcrypt");
const User = require("../models/user");

const authUser = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    user.isAuthorized = false;
    return user;
  }

  user.isAuthorized = await bcrypt.compare(password, user.password);
  return user;
};

module.exports = {
  authUser,
};
