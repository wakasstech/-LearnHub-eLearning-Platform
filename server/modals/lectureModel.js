const { DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const lectureModel = sequelize.define('Lecture', {
    course_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'courses', 
        key: 'id',
      },
    },
    lecture_name: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    lecture_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lecture_outline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lecture_duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id', 
      },
   
    },
  }, {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields
  });

  // Define associations
  lectureModel.associate = (models) => {
    // Lecture belongs to a Course
    lectureModel.belongsTo(models.courseModel, {
      foreignKey: 'course_id',
      as: 'course',
    });

    // Lecture belongs to a User (creator)
    lectureModel.belongsTo(models.userModel, {
      foreignKey: 'created_by',
      as: 'creator',
    });
    lectureModel.hasMany(models.videoModel, {
        foreignKey: 'lecture_id',
        as: 'Videos',
      });
  };

  return lectureModel;
};
