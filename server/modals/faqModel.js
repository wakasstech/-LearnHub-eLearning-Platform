const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const faqModel = sequelize.define('FAQ', {
    question: {
      type: DataTypes.TEXT,
      allowNull: false, // Question is required
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false, // Answer is required
    },
    references: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [], // Default value as an empty array
        get() {
          // Retrieve raw value from the database
          const rawValue = this.getDataValue('references');
          // Safely parse JSON or return an empty array if rawValue is null or invalid
          try {
            return rawValue ? JSON.parse(rawValue) : [];
          } catch (e) {
            console.error('Error parsing references:', e);
            return [];
          }
        },
        set(value) {
          // Set value directly as JSON (Array or Object)
          this.setDataValue('references', value);
        },
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
      },
      imported: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
      },
  }, {
    timestamps: true, 
  });

  // Define associations
//   faqModel.associate = (models) => {
//     faqModel.belongsTo(models.courseModel, {
//       foreignKey: 'course_id',
//       as: 'course',
//       onDelete: 'CASCADE', // Deletes FAQs if the related course is deleted
//     });
//   };

  return faqModel;
};
