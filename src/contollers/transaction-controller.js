const Transaction = require("../../models/Transaction");
const { v4: uuidv4 } = require("uuid");
// const Transactions = require("../../models/Transaction");

module.exports.makeNewTransaction = async (req, res) => {
  const { firstName, lastName, email, parts, address, totalPrice } = req.body;
};
