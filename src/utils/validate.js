const { isEmail, isStrongPassword } = require("validator");

const validateSignupInput = (req) => {
  const { name, email, password } = req.body;

  if (!name) {
    throw new Error("User name is required");
  } else if (!isEmail(email)) {
    throw new Error("Invalid email: " + email);
  } else if (!isStrongPassword(password, { minLength: 6 })) {
    throw new Error(
      "Please enter a strong password. Password must contain at least 1 lowercase, 1 uppercase, 1 digit, 1 symbol and at least of 6 characters",
    );
  }
};

const validateLoginInput = (email, password) => {
  if (!isEmail(email)) {
    throw new Error("Invalid email: " + email);
  } else if (!password) {
    throw new Error("Please enter your password to login");
  }
};

module.exports = { validateSignupInput, validateLoginInput };
