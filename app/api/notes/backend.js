const { emit_notice } = require('../../sockets/sockets');
const Notes = require('../../models/notes');
const { errorHandler } = require('../../utils/utils');


// ==================== Add New Teacher ====================
exports.upload_notes = async (request, response) => {
    try {
        const data = {...request.body, notes_file: request.files.notes_file.map(file => file.originalname)[0]};
        await Notes.create(data);
        response.json({message: "Notes successfully Uploaded", status: "success"});
    } catch (error) {
        console.log(error);
        const errors = errorHandler(error);
        response.json({message: errors, status: "error"});
    }
}





// ==================== Get Notices ====================
exports.get_notes = async (request, response) => {
    try {
        let query = {};

        if (request.query && request.query.search) {
            query['notes_title'] = {$regex: request.query.search, $options: "i"};
        }else{
            query = request.query;
        }

        const notes = await Notes.find(query);
        response.json({ notes });
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}





// ==================== Delete Notice ====================
exports.delete_notice = async (request, response) => {
    try {
        await Notes.findByIdAndDelete(request.body.notice_id);
        response.json({message: "Notice Successfully Deleted", status: "success"});
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}