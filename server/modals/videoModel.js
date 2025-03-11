const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const videoModel = sequelize.define('Video', {
    userId: {
      type: DataTypes.STRING, // Assuming userId is a string
      allowNull: true,
    },
    lecture_id: {
      type: DataTypes.INTEGER, // Assuming lecture_id references the Lecture model
      references: {
        model: 'lectures', // Must match the table name for Lecture model
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    imgPid: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    videoPid: {
      type: DataTypes.STRING,
      allowNull: false, // Required field
    },
    videoPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Default value
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Default value
    },
    tags: {
      type: DataTypes.JSON, // Store an array of tags
      defaultValue: [], // Default value
    },
    likes: {
      type: DataTypes.JSON, // Store an array of user IDs
      defaultValue: [], // Default value
    },
    dislikes: {
      type: DataTypes.JSON, // Store an array of user IDs
      defaultValue: [], // Default value
    },
  }, {
    timestamps: true, // Adds createdAt and updatedAt
  });

  // Define associations
  videoModel.associate = (models) => {
    // Video belongs to a Lecture
    videoModel.belongsTo(models.lectureModel, {
      foreignKey: 'lecture_id',
      as: 'lecture',
    });
  };

  return videoModel;
};
