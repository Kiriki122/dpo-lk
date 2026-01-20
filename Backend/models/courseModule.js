"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CourseModule extends Model {
    static associate(models) {
      CourseModule.belongsTo(models.Course, { foreignKey: "courseId" });
    }
  }

  CourseModule.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hours: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "CourseModule",
    }
  );

  return CourseModule;
};
