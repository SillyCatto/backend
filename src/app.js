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

    const isLoginSuccessful = await authUser(email, password);

    if (isLoginSuccessful) {
      res.cookie("token", "saganigadik");
      res.send("Login successful!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// get user by email
app.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong :(");
  }
});

app.get("/profile", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.send("reading cookies");
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
