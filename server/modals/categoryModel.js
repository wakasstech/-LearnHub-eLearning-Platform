
module.exports = ( sequelize, DataTypes)=>{
  const categoryModel = sequelize.define('category',{
    // _id: {
    //   type: DataTypes.INTEGER, // or UUID if needed
    //   primaryKey: true,
    //   autoIncrement: true, // If you want automatic incrementing IDs
    // },
    category_name: {
      type: DataTypes.STRING,
    },
    category_description : {
     type : DataTypes.STRING
    },

  },{
    underscored: true, 
    timestamps: true ,
  }
  );

categoryModel.associate = models => {
categoryModel.hasMany(models.subcategoryModel, { foreignKey: 'category_id', as: 'subCategories',
});
console.log(categoryModel)
categoryModel.hasMany(models.courseModel, { foreignKey: 'category_id', as: 'courses',
});
};
  return categoryModel;
  }
