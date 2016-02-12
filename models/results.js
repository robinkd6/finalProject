'use strict';
module.exports = function(sequelize, DataTypes) {
  var results = sequelize.define('results', {
    user_id: DataTypes.INTEGER,
    data: DataTypes.TEXT,
    mbti: DataTypes.STRING,
    summary: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return results;
};