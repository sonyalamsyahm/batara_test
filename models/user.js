"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      roletype: DataTypes.INTEGER
    },
    {}
  );
  user.associate = function(models) {
    user.belongsTo(models.role, {
      foreignKey: "roletype",
      sourceKey: "id"
    });

    user.belongsToMany(models.media, {
      through: "shares",
      foreignKey: "userId"
    });

    user.belongsToMany(models.news, {
      through: "shares",
      foreignKey: "userId"
    });
  };
  return user;
};
