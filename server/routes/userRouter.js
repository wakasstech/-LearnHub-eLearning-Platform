const userController = require("../Controllers/userController");
const express = require("express");
 const router = express.Router();
 const auth = require("../MiddleWares/auth");
 const { verifyJWT } = require("../MiddleWares/auth");
 const { upload } = require("../MiddleWares/multer.middleware");
 router.post("/create", userController.registerUser);
 router.post("/userlogin", userController.loginUser);
 router.post("/checkMail", userController.checkEmail);
 router.get("/getuser",verifyJWT, userController.getUser);
 router.get("/getAlluser",verifyJWT, userController.getAllUser);
 router.post("/logoutuser",verifyJWT, userController.logoutUser);
 router.post("/login", userController.login);
 router.post("/sendotp", userController.sendotp);
 router.post("/submitotp", userController.submitotp);
module.exports = router;






