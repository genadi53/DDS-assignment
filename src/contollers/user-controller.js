const User = require("../../models/User");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports.registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  let uuid = uuidv4();
  const hashedPass = await bcrypt.hash(password, 12);

  const user = await User.create({
    uuid,
    firstName,
    lastName,
    email,
    password: hashedPass,
    isAdmin: false,
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  res.status(200).send("User was registered!");
};

module.exports.getAll = async (req, res) => {
  const users = await User.findAll().catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  res.json(users);
};

module.exports.loginUser = async (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(404).json({ error: "ERROR! No such user!" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ status: "Successfully loged in!", user });
    });
  })(req, res, next);
};

module.exports.logoutUser = async (req, res) => {
  req.logout();
  res.status(200).send("Successfully logged out!");
};
