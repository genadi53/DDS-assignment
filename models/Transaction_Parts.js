const Sequelize = require("sequelize");
const connection = require("../src/database/connection");

const TransactionParts = connection.define("Transaction_Part", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
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

module.exports = TransactionParts;
