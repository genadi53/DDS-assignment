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
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = User;
