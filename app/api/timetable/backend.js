const { emit_notice } = require('../../sockets/sockets');
const Timetables = require('../../models/timetables');
const { errorHandler } = require('../../utils/utils');


// ==================== Add New Teacher ====================
exports.upload_timetables = async (request, response) => {
    try {
        const { body, files } = request;

        const data = { ...body, timetable: files.timetable[0].filename }
        await Timetables.create(data);
        emit_notice('student-timetable-alert', "New Notification");
        response.json({message: "Timetable Uploaded", status: "success"});
    } catch (error) {
        const errors = errorHandler(error, 'timetables');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Get Notices ====================
exports.get_timetables = async (request, response) => {
    try {
        const { search, sort, order, ...filters } = request.query;
        const query = {};

        if (search) {
            query.student_year = { $regex: search, $options: 'i' };
        }

        const sortOptions = sort || 'student_year';
        const sortOrder = order || 'asc';

        const timetables = await Timetables.find({ ...query, ...filters }).sort({ [sortOptions]: sortOrder === 'desc' ? -1 : 1 }).select('-__v').exec();
        response.json({ timetables });
    } catch (error) {
        console.error(error);
        response.json({ message: 'Something Went Wrong', status: 'error' });
    }
}





// ==================== Delete Notice ====================
exports.delete_timetable = async (request, response) => {
    try {
        await Timetables.findByIdAndDelete(request.params.id);
        response.json({message: "Timetable Successfully Deleted", status: "success"});
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}