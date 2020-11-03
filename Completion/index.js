var express = require("express");
var dotenv = require("dotenv");
var mongoose = require("mongoose");
var cors = require("cors");
var bodyParser = require("body-parser");
dotenv.config();
var app = express();
var port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    console.log("📦 Database is connected successfully");
  })
  .catch((err) => {
    console.log("Error in connecting to DB", err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var data = require("./docs/home.json");

app.get("/", (req, res) => {
  res.send(data);
});

var userRoute = require("./routes/user");

app.use("/user", userRoute);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    console.log(err);
    res.status(401).json({ error: "invalid token..." });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on ${port}`);
});
