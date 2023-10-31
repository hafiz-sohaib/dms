const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        sender_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        receiver_id: {
            type: mongoose.Schema.Types.ObjectId,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('chats', ChatSchema);