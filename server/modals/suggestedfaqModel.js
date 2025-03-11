const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const suggestedfaqModel = sequelize.define('SuggestedFAQ',{
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional, tracks which user suggested the question
      references: {
        model: 'Users', // Name of the User table if exists
        key: 'id',
      },
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false, // User-suggested question is required
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true, // Answer is optional for user suggestions
    },
    references: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [], // Default value as an empty array
      get() {
        // Retrieve raw value from the database
        const rawValue = this.getDataValue('references');
        // Parse the value as JSON or return an empty array if null
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        // Set value directly as JSON (Array or Object)
        this.setDataValue('references', value);
      },
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default: not approved
    },
  
    promotedToFAQ: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Tracks if it has been added to the FAQ table
    },
  }, {
    timestamps: true, // Enable `createdAt` and `updatedAt` fields
  });

  // Define associations
  // // suggestedfaqModel.associate = (models) => {
  // //   if (models.User) {
  // //     suggestedfaqModel.belongsTo(models.User, {
  // //       foreignKey: 'userId',
  // //       as: 'user',
  // //       onDelete: 'SET NULL', // Sets userId to null if the user is deleted
  // //     });
  // //   }

  // //   if (models.Admin) {
  // //     suggestedfaqModel.belongsTo(models.Admin, {
  // //       foreignKey: 'approvedByAdminId',
  // //       as: 'approvedByAdmin',
  // //       onDelete: 'SET NULL', // Sets adminId to null if the admin is deleted
  // //     });
  // //   }
  // // };

  // // Add a method to promote a suggested FAQ to the FAQ table
  // suggestedfaqModel.prototype.promoteToFAQ = async function (faqModel) {
  //   if (this.approved && !this.promotedToFAQ) {
  //     await faqModel.create({
  //       question: this.question,
  //       answer: this.answer || 'To be added.',
  //       references: [],
  //       deleted: false,
  //     });
  //     this.promotedToFAQ = true;
  //     await this.save();
  //   }
  // };

  return suggestedfaqModel;
};
