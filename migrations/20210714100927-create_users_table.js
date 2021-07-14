"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("users", {
      uuid: {
        type: Sequelize.CHAR(36),
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("users");
  },
};
