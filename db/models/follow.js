'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {
    indexes: [
      {
        unique: true,
        fields: ['followerId', 'userId']
      }
    ]
  });
  Follow.associate = function (models) {
    // associations can be defined here
  };
  return Follow;
};