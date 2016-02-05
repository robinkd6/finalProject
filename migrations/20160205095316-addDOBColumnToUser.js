'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'users',
      'dob',
      {
        type: Sequelize.DATE,
        allowNull: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'users',
      'dob'
    )
  }
};
