const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema(
    {
        notes_title: {
            type: String,
            required: [true, "Notes Title is required"],
            minLength: [3, "notes Title should be at least 3 characters long"]
        },
        notes_file: {
            type: String,
        },
        notes_batch_year: {
            type: String,
        },
        notes_content: {
            type: String,
            required: [true, "Notes Content is required"],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('notes', NotesSchema);