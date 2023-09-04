const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema(
    {
        sender_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        reciever_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        message: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('chats', ChatSchema);