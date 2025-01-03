const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");

const {
  jsonErrorHandler,
  globalErrorHandler,
  routeNotFound,
} = require("./middlewares/errorHandler");

const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/userRouter");

const port = 3000;
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(jsonErrorHandler);
app.use(cookieParser());

app.use("/", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);

app.use(routeNotFound);
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
      console.error("Error connecting to database. " + err.message);
    });
};

module.exports = { run };
