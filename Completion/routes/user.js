var express = require("express");
var router = express.Router();

var userController = require("../controllers/user");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/signout", userController.requireSignIn, userController.signout);
router.get(
  "/allCities",
  userController.requireSignIn,
  userController.giveAllCities
);

module.exports = router;
