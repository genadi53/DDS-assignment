const User = require("../../models/User");
const { v4: uuidv4 } = require("uuid");
// const Transactions = require("../../models/Transaction");

module.exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  //console.log(firstName, lastName, email, password);
  let uuid = uuidv4();
  //console.log(uuid);
  const user = await User.create({
    uuid,
    firstName,
    lastName,
    email,
    password,
    isAdmin: false,
  }).catch((err) => {
    console.log(err);
    res.redirect("/api/homepage");
  });
  res.send(user);
  //res.redirect("/api/homepage");
};

module.exports.getAll = async (req, res) => {
  const users = await User.findAll();
  console.log(users.every((user) => user instanceof User)); // true
  //console.log("All users:", JSON.stringify(users, null, 2));
  res.send(users);
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
};

module.exports.loginUser = async (req, res) => {
  req.logout();
  res.redirect("/api/homepage");
};
