"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("transactions", {
      uuid: {
        type: Sequelize.CHAR(36),
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.CHAR(36),
        allowNull: false,
      },
      partId: {
        type: Sequelize.CHAR(36),
        allowNull: false,
      },
      partQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      addressForShipping: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false,
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
    await queryInterface.dropTable("transactions");
  },
};
