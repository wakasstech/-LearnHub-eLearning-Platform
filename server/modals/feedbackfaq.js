const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const feedbackFaqModel = sequelize.define('FeedbackFAQ', {
    faqId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Required, references the FAQ being commented on
      references: {
        model: 'FAQs', // Name of the related table
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional, if you track which user provided feedback
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional, a rating (e.g., 1 to 5 stars)
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true, // Optional, user-provided comments about the FAQ
    },
    flaggedAsInaccurate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default is not flagged
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Tracks if the feedback has been addressed
    },
  }, {
    timestamps: true, // Enable `createdAt` and `updatedAt` fields
  });

  // Define associations
  feedbackFaqModel.associate = (models) => {
    feedbackFaqModel.belongsTo(models.FAQ, {
      foreignKey: 'faqId',
      as: 'faq',
      onDelete: 'CASCADE', // Deletes feedback if the related FAQ is deleted
    });

    if (models.User) {
      feedbackFaqModel.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'SET NULL', // Sets userId to null if the user is deleted
      });
    }
  };

  return feedbackFaqModel;
};
