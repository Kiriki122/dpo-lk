"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Token.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      refreshToken: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      sequelize,
      modelName: "Token",
    }
  );
  return Token;
};
