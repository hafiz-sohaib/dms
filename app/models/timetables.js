const mongoose = require('mongoose');


const timetableSchema = new mongoose.Schema(
    {
        student_year: {
            type: String,
            required: [true, "Student Year is required"],
        },
        student_section: {
            type: String,
            required: [true, "Student Section is required"],
        },
        timetable: {
            type: String,
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('timetables', timetableSchema);