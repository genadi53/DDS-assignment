"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("transaction_parts", {
      transactionId: {
        type: Sequelize.CHAR(36),
        primaryKey: true,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("transaction_parts");
  },
};
