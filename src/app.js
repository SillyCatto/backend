const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const User = require("./models/user");
const {
  validateSignupInput,
  validateLoginInput,
} = require("./middlewares/validateInput");
const { encryptPassword } = require("./utils/encryptor");
const { authUser } = require("./middlewares/authLogin");
const { authUserToken } = require("./middlewares/authToken");

const {
  jsonErrorHandler,
  globalErrorHandler,
} = require("./middlewares/errorHandler");

const port = 3000;
const app = express();

app.use(express.json());
app.use(jsonErrorHandler);
app.use(cookieParser());

app.post("/signup", validateSignupInput, async (req, res) => {
  try {
    req.body.password = await encryptPassword(req.body.password);

    const user = new User(req.body);

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/login", validateLoginInput, authUser, async (req, res) => {
  try {
    const user = req.body.user;
    const token = await user.getJWT();
    res.cookie("token", token);
    res.send("Login successful!");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", authUserToken, async (req, res) => {
  try {
    res.send(req.user);
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

app.use(globalErrorHandler);

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
