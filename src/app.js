const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const User = require("./models/user");
const {
  validateSignupInput,
  validateLoginInput,
} = require("./utils/validateInput");
const { encryptPassword } = require("./utils/encryptor");
const { authUser } = require("./controller/auth");
const { generateToken, validateToken } = require("./utils/jwt");

const port = 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignupInput(req);

    req.body.password = await encryptPassword(req.body.password);

    const user = new User(req.body);

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    validateLoginInput(email, password);

    const user = await authUser(email, password);

    if (user.isAuthorized) {
      const token = await generateToken(user._id);
      console.log(token);
      res.cookie("token", token);
      res.send("Login successful!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Invalid token");

    const { _id } = await validateToken(token);
    const user = await User.findById(_id);

    if (user) {
      res.send(user);
    } else {
      throw new Error("Please login first");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong :(");
  }
});

app.delete("/deleteUserByName", async (req, res) => {
  const username = req.body.name;

  try {
    const deletedUser = await User.findOneAndDelete({ name: username });
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong :(");
  }
});

const run = () => {
  connectDB()
    .then(() => {
      console.log("Database connected successfully.");
      app.listen(port, () => {
        console.log(`server running on port: ${port}`);
      });
    })
    .catch((err) => {
      console.error("Error connecting to database");
    });
};

module.exports = { run };
