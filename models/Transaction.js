const Sequelize = require("sequelize");
const connection = require("../src/database/connection");

const Transaction = connection.define("Transaction", {
  // id: {
  //   type: Sequelize.INTEGER(11),
  //   allowNull: false,
  //   autoIncrement: true,
  //   primaryKey: true,
  // },
  uuid: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUIDV4,
    allowNull: false,
  },
  // partId: {
  //   type: Sequelize.UUIDV4,
  //   allowNull: false,
  // },
  // partQuantity: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  // },
  addressForShipping: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalPrice: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

module.exports = Transaction;
