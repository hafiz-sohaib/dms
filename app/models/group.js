const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema(
    {
        group_name: {
            type: String,
            required: [true, "Group name is required"]
        },
        group_about: {
            type: String,
            required: [true, "Group about is required"]
        },
        group_image: String
    },
    { timestamps: true }
);

module.exports = mongoose.model('groups', GroupSchema);