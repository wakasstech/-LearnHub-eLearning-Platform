const { DataTypes ,sequelize} = require('sequelize');
var db = require('../modals/index.js');
//const categoryModel = require('./categoryModel');
const Category = db.categoryModel;
module.exports = ( sequelize, DataTypes)=>{
const subcategoryModel = sequelize.define('SubCategory', {
  sub_category_name: {
    type: DataTypes.STRING,
  },
  sub_category_description: {
    type: DataTypes.STRING,
  },
  sub_category_popularity: {
    type: DataTypes.BOOLEAN,
  },
  category_id: {
    type: DataTypes.INTEGER, // Assuming Category ID is an integer (e.g., auto-incremented primary key)
    allowNull: false,
  },
}, {
  timestamps: true,            
});

//Define associations here
subcategoryModel.associate = models => {
  // One category can have many brands
  subcategoryModel.belongsTo(models.categoryModel, { foreignKey: 'category_id', as: 'categoryDetails',
  });
  subcategoryModel.hasMany(models.courseModel, { foreignKey: 'subcategory_id', as: 'courses',
  });
  // One category can have many products
  };
  return subcategoryModel;
}