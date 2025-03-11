const express = require("express");
 const router = express.Router();
 const videoController = require("../Controllers/videoController");
 const catagoryController = require("../Controllers/categoryController");

 const subcatagoryController = require("../Controllers/subcategoryController");
 const courseController = require("../Controllers/courseController");
 const lectureController = require("../Controllers/lectureController");
 const auth = require("../MiddleWares/auth");
 const { verifyJWT, checkPermission , checkEnrollment} = require("../MiddleWares/auth");
 const { upload } = require("../MiddleWares/multer.middleware");
  router.post("/create-lecture",verifyJWT, lectureController.createLecture);
  router.get("/getAll-lecture-of-course", lectureController.getAlllectureofCourse);
  router.get("/get-lecture",  lectureController.getlecture);
  router.put("/update-lecture",verifyJWT,lectureController.updatelecture);
//  router.get("/:categoryId/:subcategoryId/getall-lecture",verifyJWT, lectureController.getAlllecturesofcatagory);
//  router.get("/getall-lectures",verifyJWT, lectureController.getAlllectures);
//  router.get("/:lectureId/get-lecture",verifyJWT, lectureController.getCourse);
 module.exports= router