const auth = require("../MiddleWares/auth");
var db = require('../modals/index.js');
const Category = db.categoryModel;
const SubCategory = db.subcategoryModel;
const Course = db.courseModel;
const Lecture = db.lectureModel;
const Video = db.videoModel;
const User = db.userModel;
const jwt = require("jsonwebtoken");
const axios = require("axios");
var db = require('../modals/index.js');
const fs = require('fs');
const path = require('path');
const  {asyncHandler} = require("../utils/asyncHandler.js");
const  {ApiResponse}  = require('../utils/ApiResponse.js');
const { json } = require("body-parser");
//var  User =  db.userModel;

const {uploadOnCloudinary,deleteOnCloudinary} = require("../utils/cloudinary.js");
const { ApiError } = require("../utils/ApiError.js");
// const vidImgucloud = asyncHandler(async(req, res) => {
    
//     console.log("upload on cloadinary function called ")
//     const avatarLocalPath = req.file?.path
//     if (!avatarLocalPath) {
//         throw new ApiError(400, "coverimage file is missing")
//     }
//     const cloudinaryfile = await uploadOnCloudinary(avatarLocalPath,req.user?.email)
//     if (!cloudinaryfile.url) {
//         throw new ApiError(400, "Error while uploading on coverimage")  
//     }
// const {title,desc}=req.body
//     const user = await User.findByIdAndUpdate(
//         req.user?._id,
//         {
//           $set: {
//             'coverImage.url': cloudinaryfile.url,
//             'coverImage.publicId': cloudinaryfile.public_id
//         }
//         },
//         {new: true}
//     ).select("-password -refreshToken")
  
//     return res
//     .status(200)
//     .json(
//         new ApiResponse(200, user, "Avatar image updated successfully")
//     )
//   })
// const vidImgucloud = asyncHandler(async (req, res) => {
//     console.log("Upload on Cloudinary function called");

//     const thumbnailLocalPath = req.files['thumbnail']?.[0]?.path;
//     const videoLocalPath = req.files['video']?.[0]?.path;

//     if (!thumbnailLocalPath || !videoLocalPath) {
//         throw new ApiError(400, "Both thumbnail and video files are required");
//     }

//     const thumbnailCloudinaryFile = await uploadOnCloudinary(thumbnailLocalPath, req.user?.email);
//     const videoCloudinaryFile = await uploadOnCloudinary(videoLocalPath, req.user?.email);

//     if (!thumbnailCloudinaryFile.url || !videoCloudinaryFile.url) {
//         throw new ApiError(400, "Error while uploading files to Cloudinary");
//     }
//     const { title, desc} = req.body;
//     // Create a new video document
//     const newVideo = new Video({
//         userId: req.user._id,
//         title,
//         desc,
//         imgUrl: thumbnailCloudinaryFile.url,
//         videoUrl: videoCloudinaryFile.url,
//         imgPid:thumbnailCloudinaryFile.public_id,
//         videoPid:videoCloudinaryFile.public_id,
//        // tags: tags ? tags.split(',') : []
//     });
//     const savedVideo = await newVideo.save();
//    const user =await User.findById(req.user._id).select("-password -refreshToken")
//    if(!user) {
//     throw new ApiError(403,"user not found")
//    }
//     return res
//         .status(200)
//         .json(
//             new ApiResponse(200, {video:newVideo}, "Video uploaded and user updated successfully")
//         );
// });
//   const vidImgdcloud = asyncHandler(async(req, res) => {
//     console.log("delete from  cloudinary cloudinary function called")
//     const deletedcloudinaryfile = await deleteOnCloudinary(req.user?.coverImage.publicId)
//   console.log("deletedcloudinaryfile",deletedcloudinaryfile)
//     if (!deletedcloudinaryfile) {
//         throw new ApiError(400, "Error while deleting on coverimage")
        
//     }
//     const user = await User.findByIdAndUpdate(
//         req.user?._id,
//         {
//           $set: {
//             'coverImage.url': null,
//             'coverImage.publicId': null
//         }
//         },
//         {new: true}
//     ).select("-password -refreshToken")
  
//     return res
//     .status(200)
//     .json(
//         new ApiResponse(200, user, "Avatar image updated successfully")
//     )
//   })
const vidImgucloud = asyncHandler(async (req, res) => {
    let lecture_id = req.query.lectureId;
    console.log("Upload on Cloudinary function called");
    const thumbnailLocalPath = req.files['thumbnail']?.[0]?.path;
    const videoLocalPath = req.files['video']?.[0]?.path;
    const { title, desc, videoId } = req.body;
    let thumbnailCloudinaryFile = {};
    let videoCloudinaryFile = {};
    // If videoId is provided, fetch the existing video document
    let existingVideo = null;
    if (videoId) {
        existingVideo = await Video.findByPk(videoId);
        if (!existingVideo) {
            throw new ApiError(404, "Video not found");
        }
    }
    // Upload thumbnail if provided
    if (thumbnailLocalPath) {
        thumbnailCloudinaryFile = await uploadOnCloudinary(thumbnailLocalPath, req.user?.email);
        if (!thumbnailCloudinaryFile.url) {
            throw new ApiError(400, "Error while uploading thumbnail to Cloudinary");
        }
    } else if (existingVideo) {
        thumbnailCloudinaryFile.url = existingVideo.imgUrl;
        thumbnailCloudinaryFile.public_id = existingVideo.imgPid;
    }
    // Upload video if provided and videoId is not provided (indicating a new video)
    if (videoLocalPath && !videoId) {
        videoCloudinaryFile = await uploadOnCloudinary(videoLocalPath, req.user?.email);
        if (!videoCloudinaryFile.url) {
            throw new ApiError(400, "Error while uploading video to Cloudinary");
        }
    } else if (existingVideo) {
        videoCloudinaryFile.url = existingVideo.videoUrl;
        videoCloudinaryFile.public_id = existingVideo.videoPid;
    }
        // Determine if video should be published
        const videoPublished = title && desc ? true : false;
    let newVideo;
    if (videoId) {
        // Update existing video document
        newVideo = await Video.findByPkAndUpdate(videoId, {
            title,
            desc,
            imgUrl: thumbnailCloudinaryFile.url,
            videoUrl: videoCloudinaryFile.url,
            imgPid: thumbnailCloudinaryFile.public_id,
            videoPid: videoCloudinaryFile.public_id,
            videoPublished,
            lecture_id
        }, { new: true });
    } else {
        // Create a new video document
        newVideo = {
            userId: req.user.id,
            title,
            desc,
            imgUrl: thumbnailCloudinaryFile.url,
            videoUrl: videoCloudinaryFile.url,
            imgPid: thumbnailCloudinaryFile.public_id,
            videoPid: videoCloudinaryFile.public_id,
            videoPublished,
            lecture_id
        };
        await Video.create(newVideo)
    }
    return res.status(200).json(
        new ApiResponse(200, { video: newVideo}, "Video uploaded and user updated successfully")
    );
});
// const vidImgucloud = asyncHandler(async (req, res) => {
//     try {
//         const lectureId = req.query.lectureId;
//         console.log("Upload on Cloudinary function called");

//         const thumbnailLocalPath = req.files['thumbnail']?.[0]?.path;
//         const videoLocalPath = req.files['video']?.[0]?.path;
//         const { title, desc, videoId } = req.body;

//         let thumbnailCloudinaryFile = {};
//         let videoCloudinaryFile = {};

//         // Check if updating an existing video
//         let existingVideo = null;
//         if (videoId) {
//             existingVideo = await Video.findByPk(videoId);
//             if (!existingVideo) {
//                 throw new ApiError(404, "Video not found");
//             }
//         }

//         // Upload thumbnail to Cloudinary if provided
//         if (thumbnailLocalPath) {
//             thumbnailCloudinaryFile = await uploadOnCloudinary(thumbnailLocalPath, req.user?.email);
//             if (!thumbnailCloudinaryFile.url) {
//                 throw new ApiError(400, "Error while uploading thumbnail to Cloudinary");
//             }
//         } else if (existingVideo) {
//             thumbnailCloudinaryFile.url = existingVideo.imgUrl;
//             thumbnailCloudinaryFile.public_id = existingVideo.imgPid;
//         }

//         // Upload video to Cloudinary if provided and new video is being created
//         if (videoLocalPath && !videoId) {
//             videoCloudinaryFile = await uploadOnCloudinary(videoLocalPath, req.user?.email);
//             if (!videoCloudinaryFile.url) {
//                 throw new ApiError(400, "Error while uploading video to Cloudinary");
//             }
//         } else if (existingVideo) {
//             videoCloudinaryFile.url = existingVideo.videoUrl;
//             videoCloudinaryFile.public_id = existingVideo.videoPid;
//         }

//         // Determine if video should be published
//         const videoPublished = Boolean(title && desc);

//         let newVideo;
//         if (videoId) {
//             // Update existing video record
//             await existingVideo.update({
//                 title,
//                 desc,
//                 imgUrl: thumbnailCloudinaryFile.url,
//                 videoUrl: videoCloudinaryFile.url,
//                 imgPid: thumbnailCloudinaryFile.public_id,
//                 videoPid: videoCloudinaryFile.public_id,
//                 videoPublished,
//                 lectureId
//             });
//             newVideo = existingVideo;
//         } else {
//             // Create a new video record
//             newVideo = await Video.create({
//                 userId: req.user.id,
//                 title,
//                 desc,
//                 imgUrl: thumbnailCloudinaryFile.url,
//                 videoUrl: videoCloudinaryFile.url,
//                 imgPid: thumbnailCloudinaryFile.public_id,
//                 videoPid: videoCloudinaryFile.public_id,
//                 videoPublished,
//                 lectureId
//             });
//         }

//         // Clean up local files after upload
//         if (thumbnailLocalPath) fs.unlinkSync(thumbnailLocalPath);
//         if (videoLocalPath) fs.unlinkSync(videoLocalPath);

//         // Respond to the client
//         return res.status(200).json(
//             new ApiResponse(200, { video: newVideo }, "Video uploaded and updated successfully")
//         );
//     } catch (error) {
//         console.error(error);
//         throw new ApiError(500, "An error occurred during the upload process");
//     }
// });
const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.query; // Video ID passed as a route parameter
    const { title, desc } = req.body; // Updated fields from the request body
    // Fetch the existing video
    const existingVideo = await Video.findByPk(videoId);
    if (!existingVideo) {
        throw new ApiError(404, "Video not found");
    }
    // Update thumbnail if provided
    let thumbnailCloudinaryFile = {};
    const thumbnailLocalPath = req.files['thumbnail']?.[0]?.path;
    if (thumbnailLocalPath) {
        thumbnailCloudinaryFile = await uploadOnCloudinary(thumbnailLocalPath, req.user?.email);
        if (!thumbnailCloudinaryFile.url) {
            throw new ApiError(400, "Error while uploading thumbnail to Cloudinary");
        }
    }
    // Update video URL if provided
    let videoCloudinaryFile = {};
    const videoLocalPath = req.files['video']?.[0]?.path;
    if (videoLocalPath) {
        videoCloudinaryFile = await uploadOnCloudinary(videoLocalPath, req.user?.email);
        if (!videoCloudinaryFile.url) {
            throw new ApiError(400, "Error while uploading video to Cloudinary");
        }
    }
    // Determine updated fields
    const updatedFields = {
        ...(title && { title }),
        ...(desc && { desc }),
        ...(thumbnailCloudinaryFile.url && {
            imgUrl: thumbnailCloudinaryFile.url,
            imgPid: thumbnailCloudinaryFile.public_id,
        }),
        ...(videoCloudinaryFile.url && {
            videoUrl: videoCloudinaryFile.url,
            videoPid: videoCloudinaryFile.public_id,
        }),
    };
   
    // Update the video record
    await existingVideo.update(updatedFields);
    return res.status(200).json(
        new ApiResponse(200, { video: existingVideo }, "Video updated successfully")
    );
});
const vidImgdcloud = asyncHandler(async (req, res) => {
    const videoId = req.query.videoId;
    console.log("Delete from Cloudinary function called");
    // Find the video in the database
    const video = await Video.findByPk(videoId);
   // const video = await Video.findByPk(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    // Delete the video and its thumbnail from Cloudinary
    const deletedVideoFile = await deleteOnCloudinary(video.videoUrl);
    if(video.imgUrl){
    const deletedThumbnailFile = await deleteOnCloudinary(video.imgUrl);
    if (!deletedThumbnailFile) {
        throw new ApiError(400, "Error while deleting  thumbnail from Cloudinary");
    }
    }
    if (!deletedVideoFile) {
        throw new ApiError(400, "Error while deleting video  from Cloudinary");
    }
    // Remove the video from the Video collection
    await Video.destroy({
        where: {
            id: videoId
        }
    });
    return res.status(200).json(
        new ApiResponse(200, "Video deleted successfully")
    );
});
// get videos of a specific user
const getUserVideos = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    // Fetch videos of the user (assuming getUserVideos is a function that returns user videos)
    const videos = await  Video.findAll({userId})
    console.log("videos",videos)
    // Respond with the videos
    return res
      .status(200)
      .json(new ApiResponse(
        200,
        videos,
        "Videos fetched successfully"
      ));
  }); 
  const getAllVideos = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    // Fetch videos of the user (assuming getUserVideos is a function that returns user videos)
    const videos = await  Video.findAll()
    console.log("videos",videos)
    // Respond with the videos
    return res
      .status(200)
      .json(new ApiResponse(
        200,
        videos,
        "Videos fetched successfully"
      ));
  });
  const getVideoById = asyncHandler(async (req, res) => {
    try {
      // Extract video ID from the request parameters
      const { id } = req.query;
  
      // Find video by primary key
      const video = await Video.findByPk(id);
  
      // Check if the video exists
      if (!video) {
        return res.status(404).json(
          new ApiResponse(404, null, "Video not found")
        );
      }
  
      // Respond with the video details
      return res.status(200).json(
        new ApiResponse(200, video, "Video fetched successfully")
      );
    } catch (error) {
      // Handle any errors
      console.error("Error fetching video:", error);
      return res.status(500).json(
        new ApiResponse(500, null, "An error occurred while fetching the video")
      );
    }
  });
  
  module.exports = {
    vidImgucloud,
    vidImgdcloud,
    getUserVideos,
    getAllVideos,
    updateVideo,
    getVideoById
}

