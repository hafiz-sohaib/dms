const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema(
    {
        group_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "groups"
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('members', MemberSchema);