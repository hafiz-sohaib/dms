const { emit_notice } = require('../../sockets/sockets');
const Notes = require('../../models/notes');
const { errorHandler } = require('../../utils/utils');


// ==================== Add New Teacher ====================
exports.upload_notes = async (request, response) => {
    try {
        const data = {...request.body, notes_file: request.files.notes_file[0].filename};
        await Notes.create(data);
        response.json({message: "Notes successfully Uploaded", status: "success"});
    } catch (error) {
        const errors = errorHandler(error);
        response.json({message: errors, status: "error"});
    }
}





// ==================== Download Notes ====================
exports.download_notes = async (request, response) => {
    try {
        const fileName = request.params.fileName;
        const filePath = `storage/notes/${fileName}`;
        await response.download(filePath, fileName);
    } catch (error) {
        console.log(error);
        response.json({message: "Something went wrong", status: "error"});
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