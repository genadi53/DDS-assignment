const nodemailer = require("nodemailer");
const Transaction = require("../../models/Transaction");
const TransactionParts = require("../../models/Transaction_Parts");
const User = require("../../models/User");
const CartPart = require("../../models/CartPart");
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");

User.hasMany(Transaction, {
  as: "User_Transactions",
  foreignKey: "userId",
});

Transaction.belongsTo(User, { as: "User", foreignKey: "userId" });

Transaction.hasMany(TransactionParts, {
  as: "TransactionParts",
  foreignKey: "transactionId",
});

TransactionParts.belongsTo(Transaction, {
  as: "Transaction",
  foreignKey: "transactionId",
});

module.exports.makeNewTransaction = async (req, res) => {
  const { email, parts, address = "Sofia ..." } = req.body;
  let { totalPrice } = req.body;
  let message = "Transaction details\nProduct\t Quantity\t Price\n";
  try {
    const user = await findUser(email);
    const selledParts = [];

    for (const part of parts) {
      let id = part.uuid;
      const p = await CartPart.findAll({ where: { uuid: id } }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });

      if (part.quantity <= p[0].dataValues.quantity) {
        selledParts.push({ ...p[0].dataValues, quantity: part.quantity });
        message = message.concat(
          `${part.name}\t\t${part.quantity}\t $${part.price}\n`
        );
      } else {
        message = message.concat(`${part.name} is out of stock\n`);
        totalPrice =
          Math.round((totalPrice - part.price * part.quantity) * 100) / 100;
      }
    }

    const transaction = await createTransaction(user, address, totalPrice);

    for (let i = 0; i < selledParts.length; i++) {
      let p = await addPartsForTransaction(
        transaction.dataValues.uuid,
        selledParts[i]
      );
    }

    const mailMessage =
      transaction === null
        ? "No Transaction was made\n"
        : `Transaction address is ${address} 
  and you need to pay ${totalPrice}\n`.concat(message);

    selledParts.forEach(async (part) => {
      part = await updatePart(part);
    });

    this.sendEmail(user[0].dataValues.email, mailMessage);
    res.status(200).send("Transaction completed! Email with details was send!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: err });
  }
};

module.exports.sendEmail = async (email, message) => {
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
    text: message,
  };

  await transport.sendMail(mainOptions, function (err, success) {
    if (err) {
      console.log(err);
      throw err;
    } else console.log("*** New Email Was Send! ***");
  });
};

const findUser = async (email) => {
  const user = await User.findAll({
    where: {
      email: email,
    },
  }).catch((err) => {
    console.log(err);
    throw err;
  });
  return user;
};

const addPartsForTransaction = async (transactionId, part) => {
  let addedPart = await TransactionParts.create({
    transactionId: transactionId,
    partId: part.uuid,
    partQuantity: part.quantity,
  }).catch((err) => {
    console.log(err);
    throw err;
  });
  return addedPart;
};

const createTransaction = async (user, address, totalPrice) => {
  if (Math.floor(totalPrice) === 0) return null;
  const transaction = await Transaction.create({
    uuid: uuidv4(),
    userId: user[0].dataValues.uuid,
    addressForShipping: address,
    totalPrice: totalPrice,
  }).catch((err) => {
    console.log(err);
    throw err;
  });
  return transaction;
};

const updatePart = async (part) => {
  let id = part.uuid;
  const updatedPart = await CartPart.update(
    { quantity: sequelize.literal(`quantity - ${part.quantity}`) },
    { where: { uuid: id } }
  ).catch((err) => {
    console.log(err);
    throw err;
  });
  return updatedPart;
};
