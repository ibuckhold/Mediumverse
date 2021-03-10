'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Story, {
      foreignKey: "storyId"
    });
    Comment.belongsTo(models.User, {
      foreignKey: "userId"
    });
  };
  return Comment;
};