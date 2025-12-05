"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Token, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: { type: DataTypes.STRING, unique: true, allowNull: true },
      phone: { type: DataTypes.STRING, unique: true, allowNull: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
