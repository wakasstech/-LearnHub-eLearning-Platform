const express = require("express");
 const router = express.Router();
 const videoController = require("../Controllers/videoController");
 const catagoryController = require("../Controllers/categoryController");
 const subcatagoryController = require("../Controllers/subcategoryController");
 const courseController = require("../Controllers/courseController");
 const auth = require("../MiddleWares/auth");
 const { verifyJWT, checkPermission } = require("../MiddleWares/auth");
 const { upload } = require("../MiddleWares/multer.middleware");
 router.post("/create-course", courseController.createCourse);
 router.get("/getall-course", courseController.getAllCoursesofcatagory);
 router.get("/getall-courses", courseController.getAllCourses);
 router.get("/get-course", courseController.getCourse);
 router.put("/update-course", courseController.updateCourse);
 module.exports= router
 