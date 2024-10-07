'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the column 'bio' to 'description' in the 'Profiles' table
    await queryInterface.renameColumn('Profiles', 'bio', 'description');
  },

  down: async (queryInterface, Sequelize) => {
    // Reverse the column name change in case we need to undo this migration
    await queryInterface.renameColumn('Profiles', 'description', 'bio');
  }
};
