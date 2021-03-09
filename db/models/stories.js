'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {});
  Story.associate = function(models) {
    Story.belongsTo(models.Category, {
      foreignKey: "categoryId"
    });
    Story.belongsTo(models.User, {
      foreignKey: "storyId"
    });
  };
  return Story;
};