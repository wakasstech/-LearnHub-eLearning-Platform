const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNum: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Student"
    },
    examResult: [
        {
            courseName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
            marksObtained: {
                type: Number,
                default: 0
            }
        }
    ],
    Result: [
        {
            courseName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
            marksObtained: {
                type: Number,
                default: 0
            }
        }
    ],
    attendance: [{
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['Present', 'Absent'],
            required: true
        },
        courseName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        }
    }]
});

module.exports = mongoose.model("Student", studentSchema);