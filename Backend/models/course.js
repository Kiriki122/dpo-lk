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
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      onec_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: { type: DataTypes.TEXT, allowNull: true },
      hours: { type: DataTypes.INTEGER, defaultValue: 0 },
      goals: { type: DataTypes.TEXT, allowNull: true },
      knowledge: { type: DataTypes.TEXT, allowNull: true },
      mode: { type: DataTypes.TEXT, allowNull: true },
      category: { type: DataTypes.TEXT, allowNull: true },
      duration: { type: DataTypes.TEXT, allowNull: true },
      qualification: { type: DataTypes.TEXT, allowNull: true },
      specialty: { type: DataTypes.TEXT, allowNull: true },

      isTrainingProgram: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Course",
    }
  );

  return Course;
};
