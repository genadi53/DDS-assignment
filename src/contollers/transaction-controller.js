const nodemailer = require("nodemailer");
const Transaction = require("../../models/Transaction");
const TransactionParts = require("../../models/Transaction_Parts");
const User = require("../../models/User");
const Part = require("../../models/CartPart");

const { v4: uuidv4 } = require("uuid");
// const Transactions = require("../../models/Transaction");

module.exports.makeNewTransaction = async (req, res) => {
  const { email, parts, address, totalPrice } = req.body;

  console.log(parts);
  User.hasMany(Transaction, { as: "Transaction", foreignKey: "userId" });
  Transaction.belongsTo(User, { as: "User", foreignKey: "userId" });

  Transaction.hasOne(TransactionParts, {
    as: "TransactionParts",
    foreignKey: "transactionId",
  });
  TransactionParts.belongsTo(Transaction, {
    as: "Transaction",
    foreignKey: "transactionId",
  });

  // TransactionParts.belongsToMany(Part, {
  //   as: "CartPart",
  //   foreignKey: "partId",
  // });
  // Part.belongsToMany(TransactionParts, {
  //   as: "TransactionParts",
  //   foreignKey: "partId",
  // });

  const user = await User.findAll({
    where: {
      email: email,
    },
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  //console.log(user);
  // console.log(user[0].dataValues.uuid);

  const fetchedParts = [];
  parts.forEach(async (part) => {
    //console.log(part.partId);
    let id = part.uuid;
    const p = await Part.findAll({ where: { uuid: id } }).catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
    //console.log(p);
    fetchedParts.push(p);
    //console.log(result);
  });

  const transaction = await Transaction.create({
    uuid: uuidv4(),
    userId: user[0].dataValues.uuid,
    addressForShipping: address,
    totalPrice: totalPrice,
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: err });
  });
  //console.log(transaction.dataValues);

  for (let i = 0; i < parts.length; i++) {
    //console.log(result[i][0].dataValues.uuid);
    let p = await TransactionParts.create({
      transactionId: transaction.dataValues.uuid,
      partId: parts[i].uuid,
      partQuantity: parts[i].quantity,
    }).catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  }

  this.sendEmail(user[0].dataValues.email, transaction.dataValues);
  res.status(200).send("Transaction completed! Email with details was send!");
};

module.exports.sendEmail = async (email, transactionData) => {
  // MailTrap
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTPAR_USER,
      pass: process.env.MAILTPAR_PASS,
    },
  });

  // Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kotka5353@gmail.com",
      pass: process.env.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mainOptions = {
    from: "kotka5353@mail.com",
    to: email,
    subject: "New Transaction Was Made",
    text: `Part will be delivered to ${transactionData.addressForShipping} 
    and you need to pay ${transactionData.totalPrice}`,
  };

  await transport.sendMail(mainOptions, function (err, success) {
    if (err) console.log(err);
    else console.log("*** New Email Was Send! ***");
    //res.send("Email was send");
  });
};
