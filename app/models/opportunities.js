const mongoose = require('mongoose');

const OpportunitiesSchema = new mongoose.Schema(
    {
        opportunity_title: {
            type: String,
            required: [true, "Opportunity Title is required"]
        },
        opportunity_batch_year: {
            type: String,
            required: [true, "Opportunity Batch Year is required"]
        },
        opportunity_content: {
            type: String,
            required: [true, "Opportunity Content is required"]
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model('opportunities', OpportunitiesSchema);