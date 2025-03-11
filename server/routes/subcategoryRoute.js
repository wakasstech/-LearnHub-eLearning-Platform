const express = require("express");
 const router = express.Router();
 const videoController = require("../Controllers/videoController");
 const catagoryController = require("../Controllers/categoryController");
 const subcatagoryController = require("../Controllers/subcategoryController");
 const auth = require("../MiddleWares/auth");
 const { verifyJWT, checkPermission } = require("../MiddleWares/auth");
 const { upload } = require("../MiddleWares/multer.middleware");
 router.post("/create-sub-category",subcatagoryController.createSubcategory);
  router.get("/getallsubcategory", subcatagoryController.getallsubcategory);
  router.get("/getallPopularsubcategory",verifyJWT, subcatagoryController.getallPopularsubcategory);
  router.get('/get-single-sub-catagory', subcatagoryController.getSinglesubcategory);
  router.put('/update-single-sub-category', subcatagoryController.updatesubcategory);
  router.delete('/delete-single-sub-category/:categoryId/:subcategoryId',verifyJWT, subcatagoryController.deleletsubca);
 module.exports= router