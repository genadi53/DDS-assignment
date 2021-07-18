const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../contollers/user-controller");

router.get("/homepage", (req, res) => {
  res.send("homepage");
});

router.post("/signup", userController.registerUser);

router.get("/all", userController.getAll);

router.post("/login", userController.loginUser);

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureFlash: true,
//     failureRedirect: "/login",
//   }),
//   usersController.loginUser
// );
// module.exports.loginUser = async (req, res) => {
//   req.flash('success', 'Welcome back!');
//   const redirectUrl = req.session.returnTo || '/campgrounds';
//   delete req.session.returnTo;
//   res.redirect(redirectUrl);
// }

router.get("/logout", (req, res) => {
  res.send("/logout");
});

module.exports = router;
