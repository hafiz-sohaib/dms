const mongoose = require('mongoose');


const ExamSchema = new mongoose.Schema(
    {
        exam_teacher: {
            type: String,
            required: [true, "Exam Teacher is required"],
            unique: [true, "Exam Teacher is unique"]
        },
        exam_shift: {
            type: String,
            required: [true, "Exam Shift is required"],
        },
        exam_room: {
            type: String,
            required: [true, "Exam Room is required"],
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('exam-duties', ExamSchema);