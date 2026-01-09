"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.hasMany(models.CourseModule, {
        foreignKey: "courseId",
        as: "modules",
        onDelete: "CASCADE",
      });
    }
  }

  Course.init(
    {
      onec_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: { type: DataTypes.TEXT, allowNull: true },
      hours: { type: DataTypes.INTEGER, defaultValue: 0 },
      goals: { type: DataTypes.TEXT, allowNull: true },
      knowledge: { type: DataTypes.TEXT, allowNull: true },
      mode: { type: DataTypes.STRING, allowNull: true },
      category: { type: DataTypes.STRING, allowNull: true },
      duration: { type: DataTypes.STRING, allowNull: true },
      qualification: { type: DataTypes.STRING, allowNull: true },
      specialty: { type: DataTypes.STRING, allowNull: true },

      isTrainingProgram: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Course",
      tableName: "Courses",
    }
  );

  return Course;
};
