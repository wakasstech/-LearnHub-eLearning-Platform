// const express = require("express");
//  const router = express.Router();
//  const videoController = require("../Controllers/videoController");
//  const catagoryController = require("../Controllers/categoryController");
//  const subcatagoryController = require("../Controllers/subcategoryController");
//  const courseController = require("../Controllers/courseController");
//  const enrollmentController = require("../Controllers/enrollmentController");
//  const auth = require("../MiddleWares/auth");
//  const { verifyJWT,adminMiddleware ,checkEnrollment ,checkPermission} = require("../MiddleWares/auth");
//  const { upload } = require("../MiddleWares/multer.middleware");
//  router.post("/student-enrollment--in-course",verifyJWT, enrollmentController.enrollStudentInCourse);
//  router.post("/teacher-assigned-to-course",verifyJWT,enrollmentController.assignTeacherToCourse);
//   router.get("/geta-student-in-course",verifyJWT, enrollmentController.getStudentsInCourse);
//   router.get("/get-teachers-asigned-to-course", checkPermission("enrollment","readAny"),verifyJWT, enrollmentController.getTeachersInCourse);
//   router.get("/get-teachers-and-student-of-course",verifyJWT, enrollmentController.getUsersInCourse ); 
//   router.put('/approve', verifyJWT,adminMiddleware,enrollmentController.approveEnrollment);
// //  router.put("/:courseId/update-course",verifyJWT, courseController.updateCourse);
//  module.exports= router

const express = require("express");
 const router = express.Router();
 const videoController = require("../Controllers/videoController");
 const catagoryController = require("../Controllers/categoryController");
 const subcatagoryController = require("../Controllers/subcategoryController");
 const courseController = require("../Controllers/courseController");
 const enrollmentController = require("../Controllers/enrollmentController");
 const auth = require("../MiddleWares/auth");
 const { verifyJWT,adminMiddleware ,checkEnrollment ,checkPermission} = require("../MiddleWares/auth");
 const { upload } = require("../MiddleWares/multer.middleware");
 router.post("/student-enrollment--in-course", enrollmentController.enrollStudentInCourse);
 router.post("/teacher-assigned-to-course",enrollmentController.assignTeacherToCourse);
  router.get("/geta-student-in-course", enrollmentController.getStudentsInCourse);
  router.get("/get-teachers-asigned-to-course",  enrollmentController.getTeachersInCourse);
  router.get("/get-teachers-and-student-of-course",verifyJWT, enrollmentController.getUsersInCourse ); 
  router.put('/approve', verifyJWT,enrollmentController.approveEnrollment);
//  router.put("/:courseId/update-course",verifyJWT, courseController.updateCourse);
 module.exports= router