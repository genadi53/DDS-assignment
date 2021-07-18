const Sequelize = require("sequelize");
const connection = require("../src/database/connection");

const TransactionParts = connection.define("TransactionParts", {
  transactionId: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  partId: {
    type: Sequelize.UUIDV4,
    allowNull: false,
  },
  partQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Transaction;
