'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Presences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      presance_date: {
        type: Sequelize.DATE
      },
      clock_in_at: {
        type: Sequelize.TIME
      },
      clock_out_at: {
        type: Sequelize.TIME
      },
      ip_address: {
        type: Sequelize.STRING
      },
      latitude_in: {
        type: Sequelize.STRING
      },
      latitude_out: {
        type: Sequelize.STRING
      },
      longitude_in: {
        type: Sequelize.STRING
      },
      longitude_out: {
        type: Sequelize.STRING
      },
      latitude_server_in: {
        type: Sequelize.STRING
      },
      latitude_server_out: {
        type: Sequelize.STRING
      },
      longitude_server_in: {
        type: Sequelize.STRING
      },
      longitude_server_out: {
        type: Sequelize.STRING
      },
      is_late: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Presences');
  }
};