'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    hashedPassword: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Story, {
      foreignKey: "userId"
    });
    User.hasMany(models.Comment, {
      foreignKey: "userId"
    });
    User.hasMany(models.Like, {foreignKey: "userId"});
    User.belongsToMany(models.User, {
      through: "Follow",
      as: "otherPeople",
      foreignKey: "followerId",
      otherKey: "userId"
    })
  };
  return User;
};
