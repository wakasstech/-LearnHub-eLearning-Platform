const express = require("express");
 const router = express.Router();
 const videoController = require("../Controllers/videoController");
 const catagoryController = require("../Controllers/categoryController");
 const subcatagoryController = require("../Controllers/subcategoryController");
 const courseController = require("../Controllers/courseController");
 const searchController = require("../Controllers/searchController");
 const auth = require("../MiddleWares/auth");
 const { verifyJWT } = require("../MiddleWares/auth");
 const { upload } = require("../MiddleWares/multer.middleware");
  router.get("/searchkeyword", searchController.searchAll);
  router.get("/subcategoryCourseSearch", searchController.searchfromSubcategoryOnlyAllCourse);
  router.get("/CourseSearchByRating", searchController.getCoursesByRating);
 module.exports= router
 