const mongoose = require('mongoose');

const OpportunitiesSchema = new mongoose.Schema(
    {
        opportunity_title: {
            type: String,
        },
        opportunity_file: {
            type: String,
        },
        opportunity_url: {
            type: String,
        },
        opportunity_batch_year: {
            type: String,
        },
        opportunity_content: {
            type: String,
        },
        opportunity_url_data: {
            type: {},
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model('opportunities', OpportunitiesSchema);