"use strict";
module.exports = (sequelize, DataTypes) => {
  const media = sequelize.define(
    "media",
    {
      mediaName: DataTypes.STRING
    },
    {}
  );
  media.associate = function(models) {
    media.belongsToMany(models.user, {
      through: "shares",
      foreignKey: "mediaId"
    });

    media.belongsToMany(models.news, {
      through: "shares",
      foreignKey: "mediaId"
    });
  };
  return media;
};
