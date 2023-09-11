const mongoose = require('mongoose');

const GroupChatSchema = new mongoose.Schema(
    {
        sender_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        group_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "groups"
        },
        message: {
            type: String,
            required: [true, "Message is required"],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('group-chats', GroupChatSchema);