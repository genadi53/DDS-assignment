const Sequelize = require("sequelize");
const connection = require("../src/database/connection");

const User = connection.define("User", {
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
  firstName: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(40),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING(25),
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = User;
