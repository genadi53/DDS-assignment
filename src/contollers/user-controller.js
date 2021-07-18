const User = require("../../models/User");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
// const Transactions = require("../../models/Transaction");

module.exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  //console.log(firstName, lastName, email, password);
  let uuid = uuidv4();
  const hashedPass = await bcrypt.hash(password, 12);

  //console.log(uuid);
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
  //res.json(user);
  res.status(200).send("User was registered!");
};

module.exports.getAll = async (req, res) => {
  const users = await User.findAll().catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  //console.log(users.every((user) => user instanceof User)); // true
  //console.log("All users:", JSON.stringify(users, null, 2));
  res.json(users);
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findAll({
    where: {
      email: email,
    },
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  //console.log(user);
  let isPassValid = false;
  if (user.length !== 0) {
    isPassValid = await bcrypt.compare(password, user[0].dataValues.password);
    isPassValid
      ? res.status(200).send("Successfully loged in!")
      : res.status(401).send("Password does not match!");
  }
  //console.log(user[0].dataValues.password);
  //console.log(password);
  //console.log(isPassValid);
};

module.exports.logoutUser = async (req, res) => {
  res.status(200).send("Successfully loged out!");
};
