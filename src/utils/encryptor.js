const bcrypt = require("bcrypt");

const encryptPassword = (password) => {
  return bcrypt.hash(password, 10);
};

module.exports = {
  encryptPassword,
};
