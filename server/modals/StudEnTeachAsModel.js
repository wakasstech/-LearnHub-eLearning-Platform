// const mongoose = require('mongoose');
// const enrollmentSchema = new mongoose.Schema({
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
//   username:{ type: String },
//   role: { type: String,
//   enum: ['student', 'teacher'],      required: true }, // Specify the role
//   enrollment_date: { type: Date, default: Date.now },
//   completed_status: { type: Boolean, default: false },
//   total_lectures_attended: { type: Number, default: 0 },
//   final_grade: { type: String },
//   review: { type: String },
//   approved: { type: Boolean, default: false },
//   teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Optional field for teachers
// });
// // Create a model for the unified schema
// const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
// module.exports = Enrollment;
// const mongoose = require('mongoose');
// const enrollmentSchema = new mongoose.Schema({
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
//   username:{ type: String },
//   role: { type: String,
//   enum: ['student', 'teacher'],      required: true }, // Specify the role
//   enrollment_date: { type: Date, default: Date.now },
//   completed_status: { type: Boolean, default: false },
//   total_lectures_attended: { type: Number, default: 0 },
//   final_grade: { type: String },
//   review: { type: String },
//   approved: { type: Boolean, default: false },
//   teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Optional field for teachers
// });
// // Create a model for the unified schema
// const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
// module.exports = Enrollment;
module.exports = (sequelize, DataTypes) => {
  const Enrollment = sequelize.define("Enrollment", {
    id: {
      type: DataTypes.INTEGER, // Use UUID for uniqueness
      allowNull: false,

      primaryKey: true,
      autoIncrement: true, 
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" }, // Foreign key to User
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Courses", key: "id" }, // Foreign key to Course
    },
    username: {
      type: DataTypes.STRING,
     
    },
    role: {
      type: DataTypes.ENUM("student", "teacher"),
      allowNull: false,
    },
    enrollment_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    completed_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    total_lectures_attended: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    final_grade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "Users", key: "id" }, // Optional field for teacher
    },
  });

  // Associations
  Enrollment.associate = (models) => {
    Enrollment.belongsTo(models.userModel, { foreignKey: "user_id", as: "user" });
    Enrollment.belongsTo(models.courseModel, { foreignKey: "course_id", as: "course" });
    Enrollment.belongsTo(models.userModel, { foreignKey: "teacher_id", as: "teacher" }); // Optional teacher
  };

  return Enrollment;
};