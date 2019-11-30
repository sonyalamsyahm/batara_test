"use strict";
module.exports = (sequelize, DataTypes) => {
  const file = sequelize.define(
    "file",
    {
      fileName: DataTypes.STRING,
      newsId: DataTypes.INTEGER
    },
    {}
  );
  file.associate = function(models) {};
  return file;
};
