const express = require("express");
 const router = express.Router();
 const videoController = require("../Controllers/videoController");
 const auth = require("../MiddleWares/auth");
 const { verifyJWT, checkPermission , checkEnrollment} = require("../MiddleWares/auth");
 const { upload } = require("../MiddleWares/multer.middleware");
 router.post("/create-video",verifyJWT, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req, res,next) => {
    next();
  }, videoController.vidImgucloud);
  router.put("/update-video",verifyJWT, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req, res,next) => {
    next();
  }, videoController.updateVideo);
  router.delete("/delete-video",verifyJWT, videoController.vidImgdcloud);
  router.get('/uservideos',verifyJWT, videoController.getUserVideos);
  router.get('/getvideo',verifyJWT, videoController.getVideoById);
  router.get('/getallvideos',verifyJWT, videoController.getAllVideos);
 module.exports= router