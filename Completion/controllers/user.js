var User = require("../modals/user");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var rawData = require("../docs/raw.json");

require("dotenv").config();

var signup = (req, res) => {
  var newUser = new User(req.body);

  if (newUser.email == undefined || newUser.password == undefined) {
    return res.json({ error: "Please provide both email and password" });
  }
  newUser.updated = newUser.created;
  User.findOne({ email: newUser.email }).then((user) => {
    if (user) {
      return res.json({
        error: "User is already exists with this email id and please login",
      });
    }
    newUser
      .save()
      .then((savedUser) => {
        savedUser.hashed_password = undefined;
        return res.json({
          message: "User saved successfully",
          savedUser,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ error: "Error in saving the user" });
      });
  });
};

var login = (req, res) => {
  var user = req.body;
  if (user.email == undefined || user.password == undefined) {
    res.json({
      error: "Please provide both email as well as password",
    });
  }

  User.findOne({
    email: user.email,
  }).then((userRes) => {
    if (!userRes) {
      return res.json({ error: "User is not signup with this email Id" });
    }
    if (!userRes.authenticate(user.password)) {
      return res.json({
        error: "UnAuthorized!Please give correct password",
      });
    }
    const token = jwt.sign(
      { _id: userRes._id, time: userRes.updated },
      process.env.JWT_SECRET
    );

    res.cookie("t", token, { expire: new Date() + 9999 });
    userRes.hashed_password = undefined;
    res.json({ token, userRes });
  });
};

var signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "signout success!" });
};

var requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});

var giveAllCities = (req, res) => {
  res.send(rawData);
};

module.exports = {
  signup,
  login,
  signout,
  requireSignIn,
  giveAllCities,
};
