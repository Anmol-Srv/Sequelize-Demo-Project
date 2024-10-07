'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // The 'up' method specifies what to do when applying this migration
    await queryInterface.addColumn('Posts', 'publishedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      comment: 'The date and time when the post is published'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // The 'down' method specifies what to do when rolling back this migration
    await queryInterface.removeColumn('Posts', 'publishedAt');
  }
};
