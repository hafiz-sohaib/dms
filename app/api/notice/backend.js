const { emit_notice } = require('../../sockets/sockets');
const Notices = require('../../models/notices');
const { errorHandler } = require('../../utils/utils');


// ==================== Add New Teacher ====================
exports.upload_notice = async (request, response) => {
    try {
        const notice = await Notices.create(request.body);

        if (notice.notice_roll === "for-students") {
            emit_notice('student-notice-alert', "New Notification");
            response.json({message: "Notice Uploaded For Students", status: "success"});
        }else if (notice.notice_roll === "for-teachers") {
            emit_notice('teacher-notice-alert', "New Notification");
            response.json({message: "Notice Uploaded For Teachers", status: "success"});
        }else if (notice.notice_roll === "for-everyone") {
            emit_notice('everyone-notice-alert', "New Notification");
            response.json({message: "Notice Uploaded For Everyone", status: "success"});
        }
    } catch (error) {
        console.log(error);
        const errors = errorHandler(error, 'notices');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Get Notices ====================
exports.get_notices = async (request, response) => {
    try {
        const { search, sort, order, ...filters } = request.query;
        const query = {};

        if (search) {
            query.notice_title = { $regex: search, $options: 'i' };
        }

        const sortOptions = sort || 'notice_title';
        const sortOrder = order || 'asc';

        const notices = await Notices.find({ ...query, ...filters }).sort({ [sortOptions]: sortOrder === 'desc' ? -1 : 1 }).select('-__v').exec();
        response.json({ notices });
    } catch (error) {
        console.error(error);
        response.json({ message: 'Something Went Wrong', status: 'error' });
    }
}





// ==================== Delete Notice ====================
exports.delete_notice = async (request, response) => {
    try {
        await Notices.findByIdAndDelete(request.params.id);
        response.json({message: "Notice Successfully Deleted", status: "success"});
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}