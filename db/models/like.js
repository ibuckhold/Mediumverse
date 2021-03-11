'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    Like.belongsTo(models.Story, {foreignKey: "storyId"});
    Like.belongsTo(models.User, {foreignKey: "userId"});
    Like.belongsTo(models.Comment, {foreignKey: "commentId"});
  };
  return Like;
};
