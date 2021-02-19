const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const Mongoose = require("mongoose");

// Custom APIs
const UserApi = require("./api/index");

// @Custom files
const env = require("./config/env");

// @express app initialization
const app = express();

// @Database connection
Mongoose.connect(env.dbCon, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DB = Mongoose.connection;

// @DB Error
DB.on("error", () => {
  console.log(">Error occurred from the Database");
});

// @DB success
DB.once("open", () => {
  console.log(">Database connected succesfully");
});

// @middleware body parser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// @log the output request
app.use(morgan("dev"));

app.use("/api/user", UserApi);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(__dirname, "client", "build", "index.html");
  });
}

// @setup Port
const PORT = env.apiPort;

// @listen port
app.listen(PORT, () => {
  console.log("Magic Happens on Port: " + PORT);
});
