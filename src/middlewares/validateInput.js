const { isEmail, isStrongPassword } = require("validator");

const validateSignupInput = (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      throw new Error("username, email and password is required to signup");

    if (!name) {
      throw new Error("User name is required");
    } else if (!isEmail(email)) {
      throw new Error("Invalid email: " + email);
    } else if (!isStrongPassword(password, { minLength: 6 })) {
      throw new Error(
        "Please enter a strong password. Password must contain at least 1 lowercase, 1 uppercase, 1 digit, 1 symbol and at least of 6 characters",
      );
    }
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

const validateLoginInput = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !isEmail(email)) {
      throw new Error("Please enter a valid email address.");
    }

    if (!password) {
      throw new Error("Password is required to log in.");
    }
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { validateSignupInput, validateLoginInput };
