
const subcategory= require('../modals/subcategoryModel')
var db = require('../modals/index.js');
const Category = db.categoryModel;
const SubCategory = db.subcategoryModel;
const  {asyncHandler} = require("../utils/asyncHandler.js");
const mongoose =require('mongoose')
const createCategory = asyncHandler(async(req, res) => {
    const {category_name, category_description } = req.body;
    const createdCategory = await Category.create({...req.body});
    res.status(201).json(createdCategory);
  })
  
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'category_name', 'category_description'], // Select specific fields
      include: [
        {
          model: SubCategory,
          as: 'subCategories', 
          attributes: ['id', 'sub_category_name', 'sub_category_description'],
        },
      ],
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
const getSingleCategory = asyncHandler(async (req, res) => {
  const categoryId = req.query.categoryId;
  try {
    const category = await Category.findOne({
      where: { id: categoryId },
      attributes: ['id', 'category_name', 'category_description'], // Select specific fields
      include: [
        {
          model: SubCategory,
          as: 'subCategories',
          attributes: ['id', 'sub_category_name', 'sub_category_description'], // Select specific fields
        },
      ],
    });

    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
  const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.query;
    const { category_name, category_description } = req.body;
    
    const category = await Category.findByPk(categoryId);
  
    if (category) {
      // Update only the fields that are provided in req.body
      if (category_name !== undefined) {
        category.category_name = category_name;
      }
      if (category_description !== undefined) {
        category.category_description = category_description;
      }
  
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  });
  module.exports={
    createCategory,
    getAllCategories,getSingleCategory,updateCategory
  }