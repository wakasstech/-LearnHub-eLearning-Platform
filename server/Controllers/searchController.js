// const mongoose = require('mongoose');
// const Category = require('../modals/categoryModel');
// const Subcategory = require('../modals/subcategoryModel');
// const Course = require('../modals/courseModel');
// const {asyncHandler} = require('../utils/asyncHandler.js');
// const {convertDurationToDays} = require('../utils/asyncHandler.js');
// const searchAll = asyncHandler(async (req, res) => {
//     const { queries } = req.query;
//     if (!queries) {
//         return res.status(400).json({ message: 'Query parameter "q" is required' });
//     }
//     const searchRegex = new RegExp(queries, 'i'); // case-insensitive search
//     // Initial search in categories, subcategories, and courses
//     const [categories, subcategories, courses] = await Promise.all([
//         Category.find({ category_name: searchRegex }).exec(),
//         Subcategory.find({ sub_category_name: searchRegex }).exec(),
//         Course.find({ course_name: searchRegex }).exec()
//     ]);
//     const results = {
//         categories: categories.map(category => ({
//             id: category._id,
//             type: 'category',
//             name: category.category_name,
//             description: category.category_description,
//         })),
//         subcategories: subcategories.map(subcategory => ({
//             id: subcategory._id,
//             type: 'subcategory',
//             name: subcategory.sub_category_name,
//             description: subcategory.sub_category_description,
//             categoryId: subcategory.category_id,
//         })),
//         courses: courses.map(course => ({
//             id: course._id,
//             type: 'course',
//             course_name: course.course_name,
//             course_description: course.course_description,
//             duration: course.duration,
//             course_fee: course.course_fee,
//             course_salary: course.course_salary,
//             course_timings: course.course_timings,
//             thumbnail_image: course.thumbnail_image,
//             is_premium: course.is_premium,
//             course_outline: course.course_outline,
//             pre_requisites: course.pre_requisites,
//             subcategory_id: course.subcategory_id,
//             category_id: course.category_id,
//             course_rating: course.course_rating 
//         })),
//     };
//     // Check for results and filter as needed
//     if (results.courses.length) {
//         return res.json({ courses: results.courses });
//     }
//     if (results.subcategories.length) {
//         return res.json({ subcategories: results.subcategories });
//     }
//     if (results.categories.length) {
//         return res.json({ categories: results.categories });
//     }
//     res.status(404).json({ message: 'No results found' });
// });
// const searchfromSubcategoryAllCourse = asyncHandler(async (req, res) => {
//     const { queries } = req.query;
//     if (!queries) {
//         return res.status(400).json({ message: 'Query parameter "queries" is required' });
//     }
//     const phrases = queries.split(/\s*,\s*/); // Splitting by commas and trimming spaces around phrases
//     const searchRegex = new RegExp(phrases.join('|'), 'i');
//     // Search in subcategories
//     const subcategories = await Subcategory.find({
//         $or: [
//             { sub_category_name: searchRegex },
//             { sub_category_description: searchRegex }
//         ]
//     }).exec();
//     if (!subcategories.length) {
//         return res.status(404).json({ message: 'No subcategories found' });
//     }
//     // Get all courses of the found subcategories
//     const subcategoryIds = subcategories.map(subcategory => subcategory._id);
//     const courses = await Course.find({ subcategory_id: { $in: subcategoryIds } }).exec();
//     const results = {
//         subcategories: subcategories.map(subcategory => ({
//             id: subcategory._id,
//             type: 'subcategory',
//             name: subcategory.sub_category_name,
//             description: subcategory.sub_category_description,
//             categoryId: subcategory.category_id,
//             courses: courses
//                 .filter(course => course.subcategory_id.toString() === subcategory._id.toString())
//                 .map(course => ({
//                     id: course._id,
//                     type: 'course',
//                     course_name: course.course_name,
//                     course_description: course.course_description,
//                     duration: course.duration,
//                     course_fee: course.course_fee,
//                     course_salary: course.course_salary,
//                     course_timings: course.course_timings,
//                     thumbnail_image: course.thumbnail_image,
//                     is_premium: course.is_premium,
//                     course_outline: course.course_outline,
//                     pre_requisites: course.pre_requisites,
//                     subcategory_id: course.subcategory_id,
//                     category_id: course.category_id,
//                     course_rating: course.course_rating 
//                 }))
//         }))
//     };

//     res.json(results);
// });

// // const searchfromSubcategoryOnlyAllCourse = asyncHandler(async (req, res) => {
// //     const { q } = req.query;
// //     if (!q) {
// //         return res.status(400).json({ message: 'Query parameter "q" is required' });
// //     }
// //     const phrases = q.split(/\s*,\s*/); // Splitting by commas and trimming spaces around phrases
// //     const searchRegex = new RegExp(phrases.join('|'), 'i');

// //     // Search in subcategories
// //     const subcategories = await Subcategory.find({
// //         $or: [
// //             { sub_category_name: searchRegex },
// //             { sub_category_description: searchRegex }
// //         ]
// //     }).exec();

// //     if (!subcategories.length) {
// //         return res.status(404).json({ message: 'No subcategories found' });
// //     }

// //     // Get all courses of the found subcategories
// //     const subcategoryIds = subcategories.map(subcategory => subcategory._id);
// //     const courses = await Course.find({ subcategory_id: { $in: subcategoryIds } }).exec();

// //     const results = {
// //         courses: courses.map(course => ({
// //             id: course._id,
// //             type: 'course',
// //             name: course.course_name,
// //             description: course.course_description,
// //             duration: course.duration,
// //             fee: course.course_fee,
// //             salary: course.course_salary,
// //             timings: course.course_timmings,
// //             thumbnail: course.thumbnail_image,
// //             premium: course.is_premium,
// //             outline: course.course_outline,
// //             prerequisites: course.pre_requisites,
// //             subcategoryId: course.subcategory_id,
// //             categoryId: course.category_id,
// //         }))
// //     };
// //     if (results.courses.length) {
// //         return res.json(results);
// //     } else {
// //         return res.status(404).json({ message: 'No courses found for the specified subcategories' });
// //     }
// // });
// const searchfromSubcategoryOnlyAllCourse = asyncHandler(async (req, res) => {
//     const { subcategories_queries, rating, duration } = req.query;
//     let courseFilter = {};
//     if (subcategories_queries) {
//     // Split and clean up the search query
//     const phrases = subcategories_queries.split(/\s*,\s*/);
//     const searchRegex = new RegExp(phrases.join('|'), 'i');
//     // Search in subcategories
//     const subcategories = await Subcategory.find({
//         $or: [
//             { sub_category_name: searchRegex },
//             { sub_category_description: searchRegex }
//         ]
//     }).exec();
//     if (!subcategories.length) {
//         return res.status(404).json({ message: 'No subcategories found' });
//     }
//     // Get all courses of the found subcategories
//     const subcategoryIds = subcategories.map(subcategory => subcategory._id);
//     // Build the course filter
//      courseFilter = { subcategory_id: { $in: subcategoryIds } };
// }
// console.log("course filter after subcategory",courseFilter)
//     // Add rating filter if rating is provided
//     if (rating) {
//         const ratingValue = parseFloat(rating);
//         if (isNaN(ratingValue)) {
//             return res.status(400).json({ message: 'Invalid rating value' });
//         }
//         courseFilter.course_rating = { $gte: ratingValue };
//         console.log("course filter after rating",courseFilter)
//     }
    
//    // fetch courses
   
//     if (Object.keys(courseFilter).length > 0) {
//         courseFilter = await Course.find(courseFilter).exec();
//     } else {
//         console.log("else condition")
//         courseFilter = await Course.find().exec();
//     }
//       // Add duration filter if provided
//       if (duration) {
//         const durationInDays = convertDurationToDays(duration);
//         if (durationInDays === null) {
//             return res.status(400).json({ message: 'Invalid duration format. Use terms like "3 months", "1.5 months", etc.' });
//         }
//         courseFilter = courseFilter.filter(course => {
//             const courseDurationInDays = convertDurationToDays(course.duration);
//             return courseDurationInDays !== null && courseDurationInDays >= durationInDays;
//         });
//     }
//     const results = {
//         courses: courseFilter.map(course => ({
//             id: course._id,
//             type: 'course',
//             course_name: course.course_name,
//             course_description: course.course_description,
//             duration: course.duration,
//             course_fee: course.course_fee,
//             course_salary: course.course_salary,
//             course_timings: course.course_timings,
//             thumbnail_image: course.thumbnail_image,
//             is_premium: course.is_premium,
//             course_outline: course.course_outline,
//             pre_requisites: course.pre_requisites,
//             subcategory_id: course.subcategory_id,
//             category_id: course.category_id,
//             course_rating: course.course_rating // Ensure this field is available in your course schema
//         }))
//     };
//     if (results.courses.length) {
//         return res.json(results);
//     } else {
//         return res.status(404).json({ message: 'No courses found for the specified subcategories and rating and  duration' });
//     }
// });
// const getCoursesByRating = asyncHandler(async (req, res) => {
//     const { rating } = req.query;

//     if (!rating) {
//         return res.status(400).json({ message: 'Query parameter "rating" is required' });
//     }

//     const ratingValue = parseFloat(rating);
//     if (isNaN(ratingValue)) {
//         return res.status(400).json({ message: 'Invalid rating value' });
//     }

//     // Find courses with the specified rating
//     //const courses = await Course.find({ course_rating: ratingValue }).exec();//exact value
//     const courses = await Course.find({ course_rating: { $gt: ratingValue } }).exec();// grater than value

//     const results = {
//         courses: courses.map(course => ({
//             id: course._id,
//             type: 'course',
//             name: course.course_name,
//             description: course.course_description,
//             duration: course.duration,
//             fee: course.course_fee,
//             salary: course.course_salary,
//             timings: course.course_timings,
//             thumbnail: course.thumbnail_image,
//             premium: course.is_premium,
//             outline: course.course_outline,
//             prerequisites: course.pre_requisites,
//             subcategoryId: course.subcategory_id,
//             categoryId: course.category_id,
//             rating: course.course_rating // Ensure this field is available in your course schema
//         }))
//     };

//     if (results.courses.length) {
//         return res.json(results);
//     } else {
//         return res.status(404).json({ message: 'No courses found with the specified rating' });
//     }
// });
// module.exports = {
//     searchAll,
//     searchfromSubcategoryAllCourse,
//     searchfromSubcategoryOnlyAllCourse,
//     getCoursesByRating
// };


var db = require('../modals/index.js');
const Category = db.categoryModel;
const SubCategory = db.subcategoryModel;
const Course = db.courseModel;
const Lecture = db.lectureModel;
const Video = db.videoModel;
const { Op } = require('sequelize');
const {asyncHandler} = require('../utils/asyncHandler.js');
const {convertDurationToDays} = require('../utils/asyncHandler.js');
// const searchAll = asyncHandler(async (req, res) => {
//     const { queries } = req.query;
//     if (!queries) {
//         return res.status(400).json({ message: 'Query parameter "q" is required' });
//     }
//     const searchRegex = new RegExp(queries, 'i'); // case-insensitive search
//     // Initial search in categories, subcategories, and courses
//     const [categories, subcategories, courses] = await Promise.all([
//         Category.findAll({ category_name: searchRegex }).exec(),
//         SubCategory.findAll({ sub_category_name: searchRegex }).exec(),
//         Course.findAll({ course_name: searchRegex }).exec()
//     ]);
//     const results = {
//         categories: categories.map(category => ({
//             id: category._id,
//             type: 'category',
//             name: category.category_name,
//             description: category.category_description,
//         })),
//         subcategories: subcategories.map(subcategory => ({
//             id: subcategory._id,
//             type: 'subcategory',
//             name: subcategory.sub_category_name,
//             description: subcategory.sub_category_description,
//             categoryId: subcategory.category_id,
//         })),
//         courses: courses.map(course => ({
//             id: course._id,
//             type: 'course',
//             course_name: course.course_name,
//             course_description: course.course_description,
//             duration: course.duration,
//             course_fee: course.course_fee,
//             course_salary: course.course_salary,
//             course_timings: course.course_timings,
//             thumbnail_image: course.thumbnail_image,
//             is_premium: course.is_premium,
//             course_outline: course.course_outline,
//             pre_requisites: course.pre_requisites,
//             subcategory_id: course.subcategory_id,
//             category_id: course.category_id,
//             course_rating: course.course_rating 
//         })),
//     };
//     // Check for results and filter as needed
//     if (results.courses.length) {
//         return res.json({ courses: results.courses });
//     }
//     if (results.subcategories.length) {
//         return res.json({ subcategories: results.subcategories });
//     }
//     if (results.categories.length) {
//         return res.json({ categories: results.categories });
//     }
//     res.status(404).json({ message: 'No results found' });
// });

const searchAll = asyncHandler(async (req, res) => {
    const { queries } = req.query;

    if (!queries) {
        return res.status(400).json({ message: 'Query parameter "q" is required' });
    }

    try {
        // Using Sequelize LIKE operator for case-insensitive search
        const [categories, subcategories, courses] = await Promise.all([
            Category.findAll({ where: { category_name: { [Op.like]: `%${queries}%` } } }),
            SubCategory.findAll({ where: { sub_category_name: { [Op.like]: `%${queries}%` } } }),
            Course.findAll({ where: { course_name: { [Op.like]: `%${queries}%` } } })
        ]);

        // Format results
        const results = {
            categories: categories.map(category => ({
                id: category.id,
                type: 'category',
                name: category.category_name,
                description: category.category_description,
            })),
            subcategories: subcategories.map(subcategory => ({
                id: subcategory.id,
                type: 'subcategory',
                name: subcategory.sub_category_name,
                description: subcategory.sub_category_description,
                categoryId: subcategory.category_id,
            })),
            courses: courses.map(course => ({
                id: course.id,
                type: 'course',
                course_name: course.course_name,
                course_description: course.course_description,
                duration: course.duration,
                course_fee: course.course_fee,
                course_salary: course.course_salary,
                course_timings: course.course_timings,
                thumbnail_image: course.thumbnail_image,
                is_premium: course.is_premium,
                course_outline: course.course_outline,
                pre_requisites: course.pre_requisites,
                subcategory_id: course.subcategory_id,
                category_id: course.category_id,
                course_rating: course.course_rating 
            })),
        };

        // Return results based on priority
        if (results.courses.length) return res.json({ courses: results.courses });
        if (results.subcategories.length) return res.json({ subcategories: results.subcategories });
        if (results.categories.length) return res.json({ categories: results.categories });

        return res.status(404).json({ message: 'No results found' });
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
const searchfromSubcategoryAllCourse = asyncHandler(async (req, res) => {
    const { queries } = req.query;
    if (!queries) {
        return res.status(400).json({ message: 'Query parameter "queries" is required' });
    }
    const phrases = queries.split(/\s*,\s*/); // Splitting by commas and trimming spaces around phrases
    const searchRegex = new RegExp(phrases.join('|'), 'i');
    // Search in subcategories
    const subcategories = await Subcategory.find({
        $or: [
            { sub_category_name: searchRegex },
            { sub_category_description: searchRegex }
        ]
    }).exec();
    if (!subcategories.length) {
        return res.status(404).json({ message: 'No subcategories found' });
    }
    // Get all courses of the found subcategories
    const subcategoryIds = subcategories.map(subcategory => subcategory._id);
    const courses = await Course.find({ subcategory_id: { $in: subcategoryIds } }).exec();
    const results = {
        subcategories: subcategories.map(subcategory => ({
            id: subcategory._id,
            type: 'subcategory',
            name: subcategory.sub_category_name,
            description: subcategory.sub_category_description,
            categoryId: subcategory.category_id,
            courses: courses
                .filter(course => course.subcategory_id.toString() === subcategory._id.toString())
                .map(course => ({
                    id: course._id,
                    type: 'course',
                    course_name: course.course_name,
                    course_description: course.course_description,
                    duration: course.duration,
                    course_fee: course.course_fee,
                    course_salary: course.course_salary,
                    course_timings: course.course_timings,
                    thumbnail_image: course.thumbnail_image,
                    is_premium: course.is_premium,
                    course_outline: course.course_outline,
                    pre_requisites: course.pre_requisites,
                    subcategory_id: course.subcategory_id,
                    category_id: course.category_id,
                    course_rating: course.course_rating 
                }))
        }))
    };

    res.json(results);
});

// const searchfromSubcategoryOnlyAllCourse = asyncHandler(async (req, res) => {
//     const { q } = req.query;
//     if (!q) {
//         return res.status(400).json({ message: 'Query parameter "q" is required' });
//     }
//     const phrases = q.split(/\s*,\s*/); // Splitting by commas and trimming spaces around phrases
//     const searchRegex = new RegExp(phrases.join('|'), 'i');

//     // Search in subcategories
//     const subcategories = await Subcategory.find({
//         $or: [
//             { sub_category_name: searchRegex },
//             { sub_category_description: searchRegex }
//         ]
//     }).exec();

//     if (!subcategories.length) {
//         return res.status(404).json({ message: 'No subcategories found' });
//     }

//     // Get all courses of the found subcategories
//     const subcategoryIds = subcategories.map(subcategory => subcategory._id);
//     const courses = await Course.find({ subcategory_id: { $in: subcategoryIds } }).exec();

//     const results = {
//         courses: courses.map(course => ({
//             id: course._id,
//             type: 'course',
//             name: course.course_name,
//             description: course.course_description,
//             duration: course.duration,
//             fee: course.course_fee,
//             salary: course.course_salary,
//             timings: course.course_timmings,
//             thumbnail: course.thumbnail_image,
//             premium: course.is_premium,
//             outline: course.course_outline,
//             prerequisites: course.pre_requisites,
//             subcategoryId: course.subcategory_id,
//             categoryId: course.category_id,
//         }))
//     };
//     if (results.courses.length) {
//         return res.json(results);
//     } else {
//         return res.status(404).json({ message: 'No courses found for the specified subcategories' });
//     }
// });
// const searchfromSubcategoryOnlyAllCourse = asyncHandler(async (req, res) => {
//     const { subcategories_queries, rating, duration } = req.query;
//     let courseFilter = {};
//     if (subcategories_queries) {
//     // Split and clean up the search query
//     const phrases = subcategories_queries.split(/\s*,\s*/);
//     const searchRegex = new RegExp(phrases.join('|'), 'i');
//     // Search in subcategories
//     const subcategories = await SubCategory.find({
//         $or: [
//             { sub_category_name: searchRegex },
//             { sub_category_description: searchRegex }
//         ]
//     }).exec();
//     if (!subcategories.length) {
//         return res.status(404).json({ message: 'No subcategories found' });
//     }
//     // Get all courses of the found subcategories
//     const subcategoryIds = subcategories.map(subcategory => subcategory._id);
//     // Build the course filter
//      courseFilter = { subcategory_id: { $in: subcategoryIds } };
// }
// console.log("course filter after subcategory",courseFilter)
//     // Add rating filter if rating is provided
//     if (rating) {
//         const ratingValue = parseFloat(rating);
//         if (isNaN(ratingValue)) {
//             return res.status(400).json({ message: 'Invalid rating value' });
//         }
//         courseFilter.course_rating = { $gte: ratingValue };
//         console.log("course filter after rating",courseFilter)
//     }
    
//    // fetch courses
   
//     if (Object.keys(courseFilter).length > 0) {
//         courseFilter = await Course.find(courseFilter).exec();
//     } else {
//         console.log("else condition")
//         courseFilter = await Course.find().exec();
//     }
//       // Add duration filter if provided
//       if (duration) {
//         const durationInDays = convertDurationToDays(duration);
//         if (durationInDays === null) {
//             return res.status(400).json({ message: 'Invalid duration format. Use terms like "3 months", "1.5 months", etc.' });
//         }
//         courseFilter = courseFilter.filter(course => {
//             const courseDurationInDays = convertDurationToDays(course.duration);
//             return courseDurationInDays !== null && courseDurationInDays >= durationInDays;
//         });
//     }
//     const results = {
//         courses: courseFilter.map(course => ({
//             id: course._id,
//             type: 'course',
//             course_name: course.course_name,
//             course_description: course.course_description,
//             duration: course.duration,
//             course_fee: course.course_fee,
//             course_salary: course.course_salary,
//             course_timings: course.course_timings,
//             thumbnail_image: course.thumbnail_image,
//             is_premium: course.is_premium,
//             course_outline: course.course_outline,
//             pre_requisites: course.pre_requisites,
//             subcategory_id: course.subcategory_id,
//             category_id: course.category_id,
//             course_rating: course.course_rating // Ensure this field is available in your course schema
//         }))
//     };
//     if (results.courses.length) {
//         return res.json(results);
//     } else {
//         return res.status(404).json({ message: 'No courses found for the specified subcategories and rating and  duration' });
//     }
// });
const searchfromSubcategoryOnlyAllCourse = asyncHandler(async (req, res) => {
    const { subcategories_queries, rating, duration } = req.query;
    let courseFilter = {};

    if (subcategories_queries) {
        // Split and trim query input
        const phrases = subcategories_queries.split(/\s*,\s*/).map(q => q.trim());

        // Find subcategories matching the search terms
        const subcategories = await SubCategory.findAll({
            where: {
                [Op.or]: [
                    { sub_category_name: { [Op.like]: `%${phrases.join('%')}%` } },
                    { sub_category_description: { [Op.like]: `%${phrases.join('%')}%` } }
                ]
            }
        });

        if (!subcategories.length) {
            return res.status(404).json({ message: 'No subcategories found' });
        }

        // Extract subcategory IDs
        const subcategoryIds = subcategories.map(subcategory => subcategory.id);
        courseFilter.subcategory_id = { [Op.in]: subcategoryIds };
    }

    // Apply rating filter if provided
    if (rating) {
        const ratingValue = parseFloat(rating);
        if (isNaN(ratingValue)) {
            return res.status(400).json({ message: 'Invalid rating value' });
        }
        courseFilter.course_rating = { [Op.gte]: ratingValue };
    }

    // Fetch courses based on filters
    let courses = await Course.findAll({ where: courseFilter });

    // Apply duration filter if provided
    if (duration) {
        const durationInDays = convertDurationToDays(duration);
        if (durationInDays === null) {
            return res.status(400).json({ message: 'Invalid duration format. Use terms like "3 months", "1.5 months", etc.' });
        }

        courses = courses.filter(course => {
            const courseDurationInDays = convertDurationToDays(course.duration);
            return courseDurationInDays !== null && courseDurationInDays >= durationInDays;
        });
    }

    const results = {
        courses: courses.map(course => ({
            id: course.id,
            type: 'course',
            course_name: course.course_name,
            course_description: course.course_description,
            duration: course.duration,
            course_fee: course.course_fee,
            course_salary: course.course_salary,
            course_timings: course.course_timings,
            thumbnail_image: course.thumbnail_image,
            is_premium: course.is_premium,
            course_outline: course.course_outline,
            pre_requisites: course.pre_requisites,
            subcategory_id: course.subcategory_id,
            category_id: course.category_id,
            course_rating: course.course_rating
        }))
    };

    if (results.courses.length) {
        return res.json(results);
    } else {
        return res.status(404).json({ message: 'No courses found for the specified subcategories, rating, and duration' });
    }
});
// const getCoursesByRating = asyncHandler(async (req, res) => {
//     const { rating } = req.query;

//     if (!rating) {
//         return res.status(400).json({ message: 'Query parameter "rating" is required' });
//     }

//     const ratingValue = parseFloat(rating);
//     if (isNaN(ratingValue)) {
//         return res.status(400).json({ message: 'Invalid rating value' });
//     }

//     // Find courses with the specified rating
//     //const courses = await Course.find({ course_rating: ratingValue }).exec();//exact value
//     const courses = await Course.find({ course_rating: { $gt: ratingValue } }).exec();// grater than value

//     const results = {
//         courses: courses.map(course => ({
//             id: course._id,
//             type: 'course',
//             name: course.course_name,
//             description: course.course_description,
//             duration: course.duration,
//             fee: course.course_fee,
//             salary: course.course_salary,
//             timings: course.course_timings,
//             thumbnail: course.thumbnail_image,
//             premium: course.is_premium,
//             outline: course.course_outline,
//             prerequisites: course.pre_requisites,
//             subcategoryId: course.subcategory_id,
//             categoryId: course.category_id,
//             rating: course.course_rating // Ensure this field is available in your course schema
//         }))
//     };

//     if (results.courses.length) {
//         return res.json(results);
//     } else {
//         return res.status(404).json({ message: 'No courses found with the specified rating' });
//     }
// });
const getCoursesByRating = asyncHandler(async (req, res) => {
    const { rating } = req.query;

    // Validate rating input
    if (!rating) {
        return res.status(400).json({ message: 'Query parameter "rating" is required' });
    }

    const ratingValue = parseFloat(rating);
    if (isNaN(ratingValue) || ratingValue < 0) {
        return res.status(400).json({ message: 'Invalid rating value. It must be a positive number.' });
    }

    try {
        // Find courses with rating >= specified value
        const courses = await Course.find({ course_rating: { $gte: ratingValue } }).exec();

        if (!courses.length) {
            return res.status(404).json({ message: 'No courses found with the specified rating' });
        }

        // Format the response
        const results = {
            courses: courses.map(course => ({
                id: course._id,
                type: 'course',
                name: course.course_name,
                description: course.course_description,
                duration: course.duration,
                fee: course.course_fee,
                salary: course.course_salary,
                timings: course.course_timings,
                thumbnail: course.thumbnail_image,
                premium: course.is_premium,
                outline: course.course_outline,
                prerequisites: course.pre_requisites,
                subcategoryId: course.subcategory_id,
                categoryId: course.category_id,
                rating: course.course_rating
            }))
        };

        return res.json(results);
    } catch (error) {
        console.error('Error fetching courses by rating:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = {
    searchAll,
    searchfromSubcategoryAllCourse,
    searchfromSubcategoryOnlyAllCourse,
    getCoursesByRating
};