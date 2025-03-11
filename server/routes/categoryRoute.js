const express = require("express");
 const router = express.Router();
 const videoController = require("../Controllers/videoController");
 const catagoryController = require("../Controllers/categoryController");
 const auth = require("../MiddleWares/auth");
 const { verifyJWT , checkPermission} = require("../MiddleWares/auth");
 const { upload } = require("../MiddleWares/multer.middleware");
 router.post("/create-category", catagoryController.createCategory);
  router.get("/get-all-category" ,catagoryController.getAllCategories);
  router.get('/get-single-category', catagoryController.getSingleCategory);
  router.put('/updatecategory',catagoryController.updateCategory);
 module.exports= router