"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fields = ["name", "mode", "category", "duration", "qualification", "specialty"];

    for (const field of fields) {
      await queryInterface.changeColumn("Courses", field, {
        type: Sequelize.TEXT,
        allowNull: field !== "name",
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const fields = ["name", "mode", "category", "duration", "qualification", "specialty"];

    for (const field of fields) {
      await queryInterface.changeColumn("Courses", field, {
        type: Sequelize.STRING,
        allowNull: field !== "name",
      });
    }
  },
};
