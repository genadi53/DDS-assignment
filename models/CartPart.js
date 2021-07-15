const Sequelize = require("sequelize");
const connection = require("../src/database/connection");

const CartPart = connection.define("CartPart", {
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
  name: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  brand: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  model: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0.1,
  },
});

module.exports = CartPart;
