const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const courseModel = sequelize.define('Course', {
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
    },
    course_fee: {
      type: DataTypes.FLOAT, 
    },
    course_type: {
      type: DataTypes.STRING,
    },
    course_rating: {
      type: DataTypes.FLOAT, 
    },
    course_Enrollment: {
      type: DataTypes.INTEGER,
    },
    course_salary: {
      type: DataTypes.FLOAT,
    },
    course_timings: {
      type: DataTypes.STRING,
    },
    thumbnail_image: {
      type: DataTypes.STRING,
    },
    is_premium: {
      type: DataTypes.BOOLEAN,
    },
    course_description: {
      type: DataTypes.TEXT, 
    },
    course_outline: {
      type: DataTypes.TEXT,
    },
    pre_requisites: {
      type: DataTypes.TEXT,
    },
    category_id: {
      type: DataTypes.INTEGER,
      
      allowNull: true,
      references: {
        model: 'Categories', // Assumes the table name for the Category model is 'Categories'
        key: 'id',
      },
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
   
      allowNull: true,
      references: {
        model: 'SubCategories', // Assumes the table name for the SubCategory model is 'SubCategories'
        key: 'id',
      },
    },
  }, {
    timestamps: true, // Enable `createdAt` and `updatedAt` fields
  });

  // Define associations
  courseModel.associate = (models) => {
    courseModel.belongsTo(models.categoryModel, {
      foreignKey: 'category_id',
      as: 'category',
      onDelete: 'SET NULL',
    });
    courseModel.belongsTo(models.subcategoryModel, {
      foreignKey: 'subcategory_id',
      as: 'subcategory',
      onDelete: 'SET NULL',
    });
    courseModel.hasMany(models.lectureModel, {
      foreignKey: 'course_id',
      as: 'lectures', // Alias used in the `include` statement
    });
  };

  return courseModel;
};
