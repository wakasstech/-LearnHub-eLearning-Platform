var db = require('../modals/index.js');
const Category = db.categoryModel;
const SubCategory = db.subcategoryModel;
const Course = db.courseModel;
const Lecture = db.lectureModel;
const mongoose =require('mongoose')
const  {asyncHandler} = require("../utils/asyncHandler.js");

const createCourse = asyncHandler(async (req, res) => {
  const {
      course_name,
      duration,
      course_fee,
      course_salary,
      course_timings,
      thumbnail_image,
      is_premium,
      course_description,
      course_outline,
      pre_requisites,
  } = req.body;

  const { categoryId, subcategoryId } = req.body;

  // Ensure at least one of categoryId or subcategoryId is provided
  if (!categoryId && !subcategoryId) {
      return res.status(400).json({ message: "One of categoryId or subcategoryId is required to create a course." });
  }

  try {
      // Validate categoryId if provided
      if (categoryId) {
          const category = await Category.findByPk(categoryId);
          if (!category) {
              return res.status(404).json({ message: `Category with ID ${categoryId} not found.` });
          }
      }

      // Validate subcategoryId if provided
      if (subcategoryId) {
          const subcategory = await SubCategory.findByPk(subcategoryId);
          if (!subcategory) {
              return res.status(404).json({ message: `Subcategory with ID ${subcategoryId} not found.` });
          }
      }

      // Construct the course object conditionally
      let courseToBeCreated = { ...req.body };

      if (categoryId && subcategoryId) {
          courseToBeCreated = {
              ...courseToBeCreated,
              category_id: categoryId,
              subcategory_id: subcategoryId,
          };
      } else if (categoryId) {
          courseToBeCreated = {
              ...courseToBeCreated,
              category_id: categoryId,
          };
      } else if (subcategoryId) {
          courseToBeCreated = {
              ...courseToBeCreated,
              subcategory_id: subcategoryId,
          };
      }

      // Create the course in the database
      const createdCourse = await Course.create(courseToBeCreated);

      // Respond with the created course
      res.status(201).json(createdCourse);
  } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "An error occurred while creating the course." });
  }
});

  const getAllCoursesofcatagory = asyncHandler(async (req, res) => {
    try {
      const { subcategoryId, categoryId } = req.query;
  
      // Validate input
      if (!subcategoryId && !categoryId) {
        return res.status(400).json({ message: 'Either subcategoryId or categoryId must be provided' });
      }
  
      // Define where clause
      const whereClause = {};
      if (subcategoryId) {
        whereClause.subcategory_id = subcategoryId; 
      }
      if (categoryId) {
        whereClause.category_id = categoryId; 
      }
      // Fetch data with include for lectures
      const courses = await Course.findAll({
        where: whereClause,
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
          'category_id',
          'subcategory_id',
        ],
        include: [
          {
            model: Lecture,
            as: 'lectures', // Alias defined in association
            attributes: [
              'id',
              'lecture_name',
              'lecture_description',
              'lecture_outline',
              'lecture_duration',
            ],
          },
        ],
      });
  
      if (courses.length > 0) {
        res.json(courses);
      } else {
        res.status(404).json({ message: 'Courses not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });
  
  const getAllCourses = asyncHandler(async (req, res) => {
    try {
      const courses = await Course.findAll({
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
        include: [
          {
            model: Lecture,
            as: 'lectures', // Alias defined in the association
            attributes: [
              'id',
              'lecture_name',
              'lecture_description',
              'lecture_outline',
              'lecture_duration',
            ],
          },
        ],
      });
  
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });
  
  
  const getCourse = asyncHandler(async (req, res) => {
    try {
      const { courseId } = req.query;
  
      // Find the course by ID and include lectures
      const course = await Course.findOne({
        where: { id: courseId }, // Matching the course by its ID
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
        include: [
          {
            model: Lecture,
            as: 'lectures', // Alias defined in the association
            attributes: [
              'id',
              'lecture_name',
              'lecture_description',
              'lecture_outline',
              'lecture_duration',
            ],
          },
        ],
      });
  
      if (course) {
        res.json(course);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });
  const updateCourse= asyncHandler(async (req, res) => {
    const course_id=req.query.courseId
    const course = await Course.findByPk(course_id);
    if (course) {
      Object.assign(course, req.body);
      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  })
module.exports={
createCourse,
getAllCourses,
getCourse,
getAllCoursesofcatagory,
updateCourse
}