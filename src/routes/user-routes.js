const express = require("express");
const router = express.Router();
const userController = require("../contollers/user-controlle");

router.get("/homepage", (req, res) => {
  res.send("homepage");
});

router.post("/signup", userController.registerUser);

router.get("/all", userController.getAll);

router.post("/login", (req, res) => {
  res.send("/login");
});

router.get("/logout", (req, res) => {
  res.send("/logout");
});

module.exports = router;
