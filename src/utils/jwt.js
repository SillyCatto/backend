require("dotenv").config();
const jwt = require("jsonwebtoken");

const key = process.env.JWT_KEY;

const generateToken = (payload) => {
  return jwt.sign({ _id: payload }, key);
};

const validateToken = (token) => {
  return jwt.verify(token, key);
};

module.exports = {
  generateToken,
  validateToken,
};
