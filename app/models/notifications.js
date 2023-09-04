const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
    {
        notification_title: {
            type: String,
            required: [true, "Notification Title is required"],
            minLength: [3, "Notification Title should be at least 3 characters long"]
        },
        notification_batch_year: {
            type: String,
        },
        notification_content: {
            type: String,
            required: [true, "Notification Content is required"],
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('notifications', NotificationSchema);