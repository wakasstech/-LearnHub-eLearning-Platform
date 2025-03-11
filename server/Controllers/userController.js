
const cron = require('node-cron')
const bcrypt = require("bcryptjs");
const userService = require("../services/userServices");
const  {asyncHandler} = require("../utils/asyncHandler.js");
const  {ApiResponse}  = require('../utils/ApiResponse.js');
const mongoose = require("mongoose");
const Course= db.courseModel;
const  {ApiError}  = require('../utils/ApiError.js');
const FormData = require('form-data');
const nodemailer = require('nodemailer');
const { Sequelize, DataTypes,Op } = require('sequelize');
const auth = require("../MiddleWares/auth");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { Readable } = require('stream');
var db = require('../modals/index.js');
const User = db.userModel;
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { response } = require("express");
const { json } = require("body-parser");
//var  User =  db.userModel;
const generateAccessAndRefereshTokens = async(userId) =>{
  try {
      const user = await User.findByPk(userId)
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()
      user.refreshToken = refreshToken
      await user.save({ validateBeforeSave: false })
      return {accessToken, refreshToken}
  } catch (error) {
      throw new ApiError(500, "Something went wrong while generating referesh and access token")
  }
}
const registerUser = asyncHandler(async (req, res) => {
  console.log("in the register corner");

  // Extract user details from the request body
  const { fullname, email,  password } = req.body;

  // Validation: Check for empty fields
  if ([fullname, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if the user already exists by email or username
  const existedUser = await User.findOne({
    where: {
    
         email: email.trim() 
    },
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Handle avatar and image uploads if needed (uncomment and adjust for your project)
  // const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  // if (!avatarLocalPath) {
  //   throw new ApiError(400, "Avatar file is required");
  // }

  // const avatar = await uploadOnCloudinary(avatarLocalPath);
  // const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  // Create the user
  const user = await User.create({
    ...req.body
   // Hash the password if not already handled in the model/hooks
    // avatar: avatar?.url, // Add fields as necessary
    // coverImage: coverImage?.url,
  });

  // Fetch the created user, excluding sensitive fields
  const createdUser = await User.findByPk(user.id, {
    attributes: { exclude: ["password", "refreshToken"] },
  });

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // Respond with the created user
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});



const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Find the user by email using Sequelize
    const user = await User.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });

    // Send response
    return res.status(200).json({
      message: 'Login successful',
      token,
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      message: 'Error logging in',
      error: error.message || 'Internal Server Error',
    });
  }
};

const getUser = asyncHandler(async(req, res) => {
  console.log('getUser', req.user)
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      req.user,
      "User fetched successfully"
  ))
})
const logoutUser = asyncHandler(async(req, res) => {
  await User.findByIdAndUpdate(
      req.user._id,
      {
          $unset: {
              refreshToken: 1 // this removes the field from document
          }
      },
      {
          new: true
      }
  )

  const options = {
      httpOnly: true,
      secure: true
  }
  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(new ApiResponse(200, {}, "User logged Out"))
})
const getTrimName = async (req, res) => {
  try {
    const full_name = req.body.full_name.replace(/\s+/g, ' ').trim();
    // Split the full name into individual words
    const name_parts = full_name.split(" ");
    // Extract first name, middle name, and last name
    const first_name = name_parts[0].trim();
    const middle_name = name_parts.length > 2 ? name_parts[1].trim() : "";
    const last_name = name_parts.length > 1 ? name_parts[name_parts.length - 1].trim() : "";
    //const last_name = name_parts[name_parts.length - 1];
    // Print the results (console.log instead of print)
    console.log("First Name:", first_name);
    console.log("Middle Name:", middle_name);
    console.log("Last Name:", last_name);
    // Return the result in the response
    const result = {
      first_name,
      middle_name,
      last_name,
    };
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getById = async (req, res) => {
  const userId =   req.body.userId;
  console.log("userId......",userId);
  await userService.getById(userId, (err, result) => {
    if (err) return res.status(404).send(err);
    result.password = undefined;
    return res.status(200).send(result);
  });
};
const getUserWithMail = async(req,res) => {
  const {email} = req.body;
  await userService.getUserWithMail(email,(err,result)=>{
    if(err) return res.status(404).send(err);
    const dataTransferObject = {
      user: result.id,
      name: result.name,
      surname: result.surname,
      color: result.color,
      email : result.email
    };
    return res.status(200).send(dataTransferObject);
  })
}
const updateUser = async (req, res) => {
  try {
      const id = req.user.id;
      let step = req.params.stepNumber;
      const nextstep = req.params.stepNumber;
      const prevstep = req.user.step;
      step = (nextstep >= prevstep) ? nextstep : prevstep;
      // // Check if user.applicationStatus is true
      // if (req.user.applicationStatus) {
      //     return res.status(400).json({ error: 'You have already submitted documents. Data cannot be updated.' });
      // }
      const updatedUser = await userService.updateUser(id, { ...req.body, step: step });
      // Now it should be defined
      res.status(200).json(updatedUser);
  } catch (err) {
      res.status(500).json(err);
  }
};
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // If the user already exists, send a custom error response
      return res.status(400).json({ error: 'User with this email already exists.' });
    } else {
      // If the user doesn't exist, send a success message
      return res.status(200).json({ message: 'Email is available.' });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// const sendotp = async (req, res) => {
//   console.log(req.body);
  
//   const user = await User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   });

//   if (!user) {
//     return res.status(500).json({ code: 500, message: 'User not found' });
//   }
//   console.log(user.pre_signature_third_document,"user........");
//   console.log(user.pre_signature_second_document,"user........");
//   console.log(user.pre_signature_document,"user........");
//   console.log(user.last_name,"user........");
//   // Check if the user meets the requirements
//   if ((
//     (user.pre_signature_document !== null && user.pre_signature_document !== '') ||
//     (user.pre_signature_second_document !== null && user.pre_signature_second_document !== '') ||
//     (user.pre_signature_third_document !== null && user.pre_signature_third_document !== '') )
//     &&
//   (user.final_review_calculation_amount !== null && user.final_review_calculation_amount !== '')
// ){
//     let foundotp;
//     let _otp;

//     // Keep generating a new OTP until it does not match the previous OTP
//     do {
//       _otp = `S-${Math.floor(100000 + Math.random() * 900000)}`;
//       // Find a user with the generated OTP
//       foundotp = await User.findOne({
//         where: {
//           otp: _otp,
//         },
//       });
//     } while (foundotp);

//     // At this point, `_otp` is a new OTP that does not match any existing OTP in the database
//     // Perform actions with the new OTP, such as updating the user's OTP in the database
//     console.log('New OTP:', _otp);

//     let transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.OUR_EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     let info = await transporter.sendMail({
//       from: 'no-reply@setczone.com',
//       to: `${req.body.email}`, // list of receivers
//       subject: 'OTP', // Subject line
//       text: String(_otp),
//     });

//     if (info.messageId) {
//       console.log(info, 84);
//       await user.update({
//         otp: _otp,
//         otpUsed: false,
//       });
//       await user.save();
//     } else {
//       res.status(500).json({ code: 500, message: 'Server error' });
//     }

//     // Schedule a cron job to set isProcess to true after 2 minutes
//     const cronExpression = '*/3 * * * *'; // Runs every 2 minutes
//     let fn_run = 1;
//     cron.schedule(cronExpression, async () => {
//       if (user && fn_run == 1) {
//         fn_run = 0;
//         user.otp = null;
//         await user.save();
//         console.log('otp set to true after 2 minutes');
//       }
//     });
    
//     res.status(200).json({ code: 200, message: 'OTP sent' });
//   } else {
//     // Return custom error message if user does not meet requirements
//     res.status(400).json({ code: 400, message: 'User does not meet requirements to generate OTP' });
//   }
// };
const sendotp = async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  // If user is not found, return a 404 error
   if (!user) {
    return res.status(404).json({ code: 404, message: 'User not found' });
  }

  
{
    let foundotp;
    let _otp;

    // Keep generating a new OTP until it does not match the previous OTP
    do {
      _otp = `S-${Math.floor(100000 + Math.random() * 900000)}`;
      // Find a user with the generated OTP
      foundotp = await User.findOne({
        where: {
          otp: _otp,
        },
      });
    } while (foundotp);
    // At this point, `_otp` is a new OTP that does not match any existing OTP in the database
    // Perform actions with the new OTP, such as updating the user's OTP in the database
    console.log('New OTP:', _otp);
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.OUR_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    //   tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false
    // },
    tls: {
      servername: 'smtp.gmail.com',
    },
    });

    let info = await transporter.sendMail({
      from: 'no-reply@setczone.com',
      to: `${req.body.email}`, // list of receivers
      subject: 'Verification Code', // Subject line
      text: String(_otp),
    });
    if (info.messageId) {
      console.log(info, 84);
      await user.update({
        otp: _otp,
        otpUsed: false,
      });
      await user.save();
    } else {
      res.status(500).json({ code: 500, message: 'Server error' });
    }
    // Schedule a cron job to set isProcess to true after 2 minutes
    const cronExpression = '*/3 * * * *'; // Runs every 2 minutes
    let fn_run = 1;
    cron.schedule(cronExpression, async () => {
      if (user && fn_run == 1) {
        fn_run = 0;
        user.otp = null;
        await user.save();
        console.log('otp set to true after 2 minutes');
      }
    });
    res.status(200).json({ code: 200, message: 'OTP sent' });
  }
};
const submitotp = async (req, res) => {
    try {
        if (!req.body.email || !req.body.otp || !req.body.password) {
            return res.status(400).json({
                message: "Missing Fields",
                status: false
            });
        }

        // Find user by email and OTP
        const user = await User.findOne({
            where: {
                email: req.body.email,
                otp: req.body.otp,
            }
        });

        if (!user) {
            return res.status(402).json({ code: 404, message: 'OTP not found' }); 
        }
        const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  req.body.password = hashedPassword;
user.password=req.body.password
await user.save();
return res.status(200).json({ code: 200, message: 'updated password successfully' }); 
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ code: 500, message: 'Server error' });
    }
};
// const getAllUser = async (req, res) => {
//   try{
//        const users = await User.findAll({
//            raw: true,
//     attributes: { exclude: ['password'] }, // Exclude password field
//   });
  
//   console.log(users[0])
//   if(users){
//       console.log("In users ")
//     res.status(200).json(users);
//   }
//   else{
//       res.status(404).json("Error Occurred");
//   }
//   }
//   catch(err){
//       res.status(404).json(err);
//   }
// };
// const loginUser = asyncHandler(async (req, res) =>{
//   // req body -> data
//   // username or email
//   //find the user
//   //password check
//   //access and referesh token
//   //send cookie

//   const {email, password} = req.body


//   if ( !email) {
//       throw new ApiError(400, " email is required")
//   }
  
//   // Here is an alternative of above code based on logic discussed in video:
//   // if (!(username || email)) {
//   //     throw new ApiError(400, "username or email is required")
      
//   // }

//   const user = await User.findOne({
//       $or: [ {email}]
//   })

//   if (!user) {
//       throw new ApiError(404, "User does not exist")
//   }

//  const isPasswordValid = await user.isPasswordCorrect(password)

//  if (!isPasswordValid) {
//   throw new ApiError(401, "Invalid user credentials")
//   }

//  const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user.id)

//  const loggedInUser = await User.findByPk(user.id, {
//   attributes: { exclude: ['password', 'refreshToken'] },
// });

//   const options = {
//       httpOnly: true,
//       secure: true
//   }

//   return res
//   .status(200)
//   .cookie("accessToken", accessToken, options)
//   .cookie("refreshToken", refreshToken, options)
//   .json(
//       new ApiResponse(
//           200, 
//           {
//               user: loggedInUser, accessToken, refreshToken
//           },
//           "User logged In Successfully"
//       )
//   )
// })
const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      raw: true,
      attributes: { exclude: ['password'] }, // Exclude password field
    });

    // Fetch enrolled courses for each user
    for (let user of users) {
      const enrollments = await Enrollment.findAll({
        where: { user_id: user.id },
        attributes: ['course_id', 'role'],
        raw: true,
      });

      // Fetch course details for each enrolled course
      for (let enrollment of enrollments) {
        const course = await Course.findByPk(enrollment.course_id, {
          attributes: ['course_name', 'course_description', 'thumbnail_image'],
          raw: true,
        });
        if (course) {
          enrollment.course_name = course.course_name;
          enrollment.course_description = course.course_description;
          enrollment.thumbnail_image = course.thumbnail_image;
        }
      }
      
      user.enrolled_courses = enrollments; // Add enrolled courses to user object
    }

    console.log(users[0]);
    if (users.length > 0) {
      console.log("In users ");
      res.status(200).json(users);
    } else {
      res.status(404).json("Error Occurred");
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
      throw new ApiError(400, "Email is required");
  }

  // Find user using email (ensure it fetches only one user)
  const user = await User.findOne({ where: { email } });

  if (!user) {
      throw new ApiError(404, "User does not exist");
  }
console.log(user,".......................")
  // Validate password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
  }

  // Generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user.id);

  // Get user details excluding password & refresh token
  const loggedInUser = await User.findByPk(user.id, {
      attributes: { exclude: ['password', 'refreshToken'] },
  });

  const options = {
      httpOnly: true,
      secure: true, // Set true for production with HTTPS
      sameSite: 'None' // Important for cross-origin cookies
  };

  return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully"));
});
module.exports = {
  login,
  getUser,
  getAllUser,
  getUserWithMail,
  updateUser,
  sendotp,
  submitotp,
  checkEmail,
  getById,
getTrimName,
registerUser,
loginUser ,
logoutUser,

};