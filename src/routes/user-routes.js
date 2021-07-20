const express = require("express");
const router = express.Router();
const userController = require("../contollers/user-controller");

router.get("/homepage", (req, res) => {
  res.send("homepage");
});

router.post("/signup", userController.registerUser);

router.get("/all", userController.getAll);

router.get("/user", (req, res) => {
  res.send(req.user);
});

router.post("/login", userController.loginUser);

router.get("/logout", userController.logoutUser);

module.exports = router;
