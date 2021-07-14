const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "cart_parts_db",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mysql",
    //   operatorsAliases: false
  }
);

module.exports = sequelize;
