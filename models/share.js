'use strict';
module.exports = (sequelize, DataTypes) => {
  const share = sequelize.define('share', {
    userId: DataTypes.INTEGER,
    newsId: DataTypes.INTEGER,
    mediaId: DataTypes.INTEGER
  }, {});
  share.associate = function(models) {
    // associations can be defined here
  };
  return share;
};