
var db = require('../modals/index.js');
const Category = db.categoryModel;
const SubCategory = db.subcategoryModel;
const Course = db.courseModel;
const User = db.userModel;
const Lecture = db.lectureModel;

const  {asyncHandler} = require("../utils/asyncHandler.js");
const Enrollment= db.Enrollment;


      // ✅ Enroll a Student in a Course
const enrollStudentInCourse = asyncHandler(async (req, res) => {
  const { user_id, course_id, completed_status, role, total_lectures_attended } = req.body;
console.log( typeof user_id,  typeof total_lectures_attended,)
  console.log({
    user_id,

    course_id,
    completed_status,
    role,
    total_lectures_attended,
  });
  
  try {
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });
console.log(user.fullname,"user...............");
console.log(role,"role...............")

    const username = user.fullname; // Extract username

    // Check if the student is already enrolled in the course
    const existingStudent = await Enrollment.findOne({ where: { user_id, course_id, role: "student" } });
    if (existingStudent) return res.status(400).json({ message: "User is already a student in this course" });

    // Check if the user is already assigned as a teacher to this course
    const existingTeacher = await Enrollment.findOne({ where: { user_id, course_id, role: "teacher" } });
    if (existingTeacher) return res.status(400).json({ message: "User is already assigned as a teacher to this course" });

    // Enroll student
    const enrollment = await Enrollment.create({
      user_id,
      username,
      course_id,
      completed_status,
      role,
      total_lectures_attended,
      enrollment_date: new Date(),
    });
  console.log(enrollment, 'enrollmentenrollment')
    // Update course enrollment count
    let course = await Course.findByPk(course_id);
    if (course) {
      course.course_Enrollment = (course.course_Enrollment || 0) + 1;
      await course.save();
    }

    res.status(201).json({
      message: "Enrollment successful",
      enrollment,
      EnrollmentNumber: course.course_Enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Assign a Teacher to a Course
const assignTeacherToCourse = asyncHandler(async (req, res) => {
  const { user_id, course_id } = req.body;

  try {
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const username = user.fullname; // Extract username

    // Check if the teacher is already enrolled as a student
    const existingStudent = await Enrollment.findOne({ where: { user_id, course_id, role: "student" } });
    if (existingStudent) return res.status(400).json({ message: "This teacher is already a student in this course" });

    // Check if the teacher is already assigned to the course
    const existingTeacher = await Enrollment.findOne({ where: { user_id, course_id, role: "teacher" } });
    if (existingTeacher) return res.status(400).json({ message: "Teacher is already assigned to this course" });

    // Assign teacher
    const assignment = await Enrollment.create({
      user_id,
      username,
      course_id,
      role: "teacher",
      enrollment_date: new Date(),
    });

    res.status(201).json({
      message: "Teacher assigned successfully",
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get Students Enrolled in a Course
const getStudentsInCourse = asyncHandler(async (req, res) => {
  const courseId = req.query.courseId;

  try {
    const students = await Enrollment.findAll({
      where: { course_id: courseId, role: "student" },
      include: [{ model: User, as: "user", attributes: ["id", "fullname", "email"] }],
    });

    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get Teachers Assigned to a Course
const getTeachersInCourse = asyncHandler(async (req, res) => {
  const courseId = req.query.courseId;

  try {
    const teachers = await Enrollment.findAll({
      where: { course_id: courseId, role: "teacher" },
      include: [{ model: User, as: "user", attributes: ["id", "fullname", "email"] }],
    });

    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Get All Users (Students & Teachers) in a Course
const getUsersInCourse = asyncHandler(async (req, res) => {
  const courseId = req.query.courseId;

  try {
    // Run queries concurrently
    const [students, teachers] = await Promise.all([
      Enrollment.findAll({ where: { course_id: courseId, role: "student" }, include: [{ model: User, as: "user" }] }),
      Enrollment.findAll({ where: { course_id: courseId, role: "teacher" }, include: [{ model: User, as: "user" }] }),
    ]);

    res.status(200).json({ students, teachers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Approve Student Enrollment
const approveEnrollment = asyncHandler(async (req, res) => {
  const { enrollment_id } = req.body;

  try {
    const enrollment = await Enrollment.findByPk(enrollment_id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    // Approve enrollment
    enrollment.approved = true;
    await enrollment.save();

    // Get updated course enrollment count
    const course = await Course.findByPk(enrollment.course_id);

    res.status(200).json({
      message: "Enrollment approved successfully",
      enrollment,
      courseEnrollmentNumber: course ? course.course_Enrollment : 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = {
  enrollStudentInCourse,
  assignTeacherToCourse,
  getStudentsInCourse,
  getTeachersInCourse,
  getUsersInCourse,
  approveEnrollment
}