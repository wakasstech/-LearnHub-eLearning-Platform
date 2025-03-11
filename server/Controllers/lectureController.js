var db = require('../modals/index.js');
const Category = db.categoryModel;
const SubCategory = db.subcategoryModel;
const Course = db.courseModel;
const Lecture = db.lectureModel;
const Video = db.videoModel;
const  {asyncHandler} = require("../utils/asyncHandler.js");
const mongoose=require("mongoose");
const createLecture=asyncHandler(async(req, res) => {
    userId=req.user.id;
    
    const lecturetobecreated={...req.body,created_by:userId,course_id:req.body.courseId}
    const createdLecture = await Lecture.create(lecturetobecreated);
   
    res.status(201).json(createdLecture);
})
// const getAlllectureofCourse = asyncHandler(async (req, res) => {
//     const courseId=req.params.courseId
//     const lectures = await Lecture.find({course_id:courseId});
//     res.json(lectures);
// })
// const getAlllectureofCourse=asyncHandler(async (req, res) => {
//   const courseId =req.query.courseId
//   const result =await Lecture.aggregate([
//   {
//     $match:{"course_id": new mongoose.Types.ObjectId(courseId)}
//   },
//   {
//     $lookup:{
//       from:'videos',
//       localField:'_id',
//       foreignField:'lecture_id',
//       as :'videos'
      
      
//     }
      
      



//     },
//     {
//     $project:{
//       _id:1,
//       lecture_name:1,
//       lecture_description:1,
//       videos:{
//         _id:1,
//         title:1,
//         desc:1,
//         videoUrl:1,
//         imgUrl:1,
//         imgPid:1,
//         videoPid:1
//       }


//     }}
  
//   ])
//   if(result.length > 0) {
//     res.json(result);
//   }
//     else{
//       res.status(404).json({message:"lecture are not found"});
//     }
// })
const getAlllectureofCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.query;

  try {
      const lectures = await Lecture.findAll({
          where: { course_id: courseId }, // Filter by courseId
          attributes: ['id', 'lecture_name', 'lecture_description'], // Select specific fields from Lecture model
          include: [
              {
                  model: Video, 
                  as: 'Videos', 
                  attributes: ['id', 'title', 'desc', 'videoUrl', 'imgUrl', 'imgPid', 'videoPid'], // Select specific fields from Video model
              },
          ],
      });

      if (lectures.length > 0) {
          res.json(lectures);
      } else {
          res.status(404).json({ message: "Lectures not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// const getlecture = asyncHandler(async (req, res) => {
//     const lectureId=req.params.lectureId
//     const lectures = await Lecture.findById(lectureId);
//     res.json(lectures);
// })
// const getlecture=asyncHandler(async (req, res) => {
//   const lectureId =req.params.lectureId;
//   const result=await Lecture.aggregate([
// {
//   $match:{ _id: new mongoose.Types.ObjectId(lectureId)}
// },
// {
//   $lookup:{
//     from:'videos',
//     localField:'_id',
//     foreignField:'lecture_id',
//     as:'videos'

//   }
// },
// {
//   $project:{
//     _id:1,  
//     lecture_name:1,
//     lecture_description:1,
//     videos:{
// tilte:1,
// desc:1,
// imgUrl:1,
// videoUrl:1,
// imgPid:1,
// videoPid:1
//     }
//   }
// }

//   ])
//   if(result.length>0){
//     res.json(result[0])
//   }
//   else{
//     res.status(400).json({message:"lecture not found"})
//   }
// })
const getlecture = asyncHandler(async (req, res) => {
  const { lectureId } = req.query;

  try {
      const lecture = await Lecture.findOne({
          where: { id: lectureId },
          attributes: ['id', 'lecture_name', 'lecture_description'], // Lecture fields to include
          include: [
              {
                  model: Video, // Associated model
                  as: 'Videos', // Alias defined in associations
                  attributes: ['title', 'desc', 'imgUrl', 'videoUrl', 'imgPid', 'videoPid'], // Video fields to include
              },
          ],
      });

      if (lecture) {
          res.json(lecture);
      } else {
          res.status(404).json({ message: "Lecture not found" });
      }
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});
const updatelecture=
  asyncHandler(async (req, res) => {
    const lecture_id=req.query.lectureId
    const lecture = await Lecture.findByPk(lecture_id);
    if (lecture) {
      Object.assign(lecture, req.body);
      const updatedlecture = await lecture.save();
      res.json(updatedlecture);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  })
  
module.exports = { createLecture,getAlllectureofCourse,getlecture,updatelecture}