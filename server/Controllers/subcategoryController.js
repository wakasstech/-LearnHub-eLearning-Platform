var db = require('../modals/index.js');
const Category = db.categoryModel;
const SubCategory = db.subcategoryModel;
const Course = db.courseModel;
const  {asyncHandler} = require("../utils/asyncHandler.js");
const mongoose=require("mongoose");
const createSubcategory= asyncHandler(async (req, res) => {
  const category_id = req.query.categoryId;
    const { sub_category_name, sub_category_description,sub_category_popularity} = req.body;
    const subCategory = await SubCategory.create({
     ...req.body,
     category_id
    } 
  ); 
    res.status(201).json(subCategory);
  })
// const getallsubcategory = asyncHandler(async (req, res) => {
//   const categoryId = req.query.categoryId;
//   const result = await subcategory.aggregate([
//     {
//       $match: {
//         subcategory_id: new mongoose.Types.ObjectId(categoryId) 
//       }
//     },
//     {
//       $lookup: {
//         from: 'courses', 
//         localField: '_id',
//         foreignField: 'subcategory_id',
//         as: 'courses'
//       }
//     },
//     {
//       $project: {
//         _id: 1,
//         sub_category_name: 1,
//         sub_category_description: 1,
//         category_id:1,
//         categoryDetails: {
//           _id: 1,
//           category_name: 1,
//           category_description: 1
//         },
//         courses: {
//           _id: 1,
//           course_name: 1,
//           duration: 1,
//           course_fee: 1,
//           course_salary: 1,
//           course_timmings: 1,
//           thumbnail_image: 1,
//           is_premium: 1,
//           course_description: 1,
//           course_outline: 1,
//           pre_requisites: 1
//         }
//       }
//     }
//   ]);

//   if (result.length > 0) {
//     res.json(result);
//   } else {
//     res.status(404).json({ message: 'SubCategories not found' });
//   }
// });
const getallsubcategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'category_name', 'category_description'], // Select specific fields for Category
      include: [
        {
          model: SubCategory, // Assuming SubCategory is associated with Category
          as: 'subCategories', // Alias used for the relationship
          attributes: ['id', 'sub_category_name', 'sub_category_description'], // Select specific fields for SubCategory
        },
      ],
    });

    // Return the categories along with their subcategories
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
const getallPopularsubcategory = asyncHandler(async (req, res) => {
  const result = await subcategory.aggregate([
    {
      $match: {
        sub_category_popularity: true
      }
    },
    {
      $lookup: {
        from: 'courses', 
        localField: '_id',
        foreignField: 'subcategory_id',
        as: 'courses'
      }
    },
    {
      $project: {
        _id: 1,
        sub_category_name: 1,
        sub_category_description: 1,
        sub_category_popularity:1,
        category_id:1,
        categoryDetails: {
          _id: 1,
          category_name: 1,
          category_description: 1
        },
        courses: {
          _id: 1,
          course_name: 1,
          duration: 1,
          course_fee: 1,
          course_salary: 1,
          course_timmings: 1,
          thumbnail_image: 1,
          is_premium: 1,
          course_description: 1,
          course_outline: 1,
          pre_requisites: 1
        }
      }
    }
  ]);
  if (result.length > 0) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'SubCategories not found' });
  }
});
const getSinglesubcategory = asyncHandler(async (req, res) => {
  const { subcategoryId } = req.query;

  try {
    const subCategory = await SubCategory.findOne({
      where: { id: subcategoryId },
      include: [
        {
          model: Course, // Assuming the Course model is defined and associated with SubCategory
          as: 'courses',
          attributes: [
            'id',
            'course_name',
            'duration',
            'course_fee',
            'course_salary',
            'course_timings',
            'thumbnail_image',
            'is_premium',
            'course_description',
            'course_outline',
            'pre_requisites',
          ],
        },
        {
          model: Category, 
          as: 'categoryDetails',
          attributes: ['id', 'category_name', 'category_description'],
        },
      ],
      attributes: [
        'id',
        'sub_category_name',
        'sub_category_description',
      ],
    });

    if (subCategory) {
      res.json(subCategory);
    } else {
      res.status(404).json({ message: 'SubCategory not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subcategory', error: error.message });
  }
});
  // const getSinglesubcategory = asyncHandler(async (req, res) => {
  //   const { subcategoryId } = req.query;
  //   const result = await subcategory.aggregate([
  //     { $match: { _id: new mongoose.Types.ObjectId(subcategoryId) } },
  //     {
  //       $lookup: {
  //         from: 'courses', 
  //         localField: '_id',
  //         foreignField: 'subcategory_id',
  //         as: 'courses'
  //       }
  //     },
  //     {
  //       $project: {
  //         _id: 1,
  //         sub_category_name: 1,
  //         sub_category_description: 1,
  //         categoryDetails: {
  //           _id: 1,
  //           category_name: 1,
  //           category_description: 1
  //         },
  //         courses: {
  //           _id: 1,
  //           course_name: 1,
  //           duration: 1,
  //           course_fee: 1,
  //           course_salary: 1,
  //           course_timmings: 1,
  //           thumbnail_image: 1,
  //           is_premium: 1,
  //           course_description: 1,
  //           course_outline: 1,
  //           pre_requisites: 1
  //         }
  //       }
  //     }
  //   ]);
  
  //   if (result.length > 0) {
  //     res.json(result[0]);
  //   } else {
  //     res.status(404).json({ message: 'SubCategory not found' });
  //   }
  // });
  const updatesubcategory= asyncHandler(async (req, res) => {
    const category_id=req.query.categoryId
    const subcategory_id=req.query.subcategoryId
    const { sub_category_name, sub_category_description} = req.body;
    const subCategory = await SubCategory.findByPk(subcategory_id);
    if (subCategory) {
      subCategory.sub_category_name = sub_category_name;
      subCategory.sub_category_description = sub_category_description;
      subCategory.category_id = category_id;
      const updatedSubCategory = await subCategory.save();
      res.json(updatedSubCategory);
    } else {
      res.status(404).json({ message: 'SubCategory not found' });
    }
  })
     const deleletsubca=asyncHandler(async (req, res) => {
      const category_id=req.params.categoryId
      const subcategory_id=req.params.subcategoryId
    const subCategory = await subcategory.findById(subcategory_id);
    if (subCategory) {
      await subCategory.deleteOne({ _id: subcategory_id });
      res.json({ message: 'SubCategory removed' });
  } else {
      res.status(404).json({ message: 'SubCategory not found' });
  }
  })
module.exports={
 createSubcategory,
 getSinglesubcategory,
 getallsubcategory,
 deleletsubca,
 updatesubcategory,
 getallPopularsubcategory
}