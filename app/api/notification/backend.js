const { emit_notice } = require('../../sockets/sockets');
const Notification = require('../../models/notifications');
const { errorHandler } = require('../../utils/utils');


// ==================== Add New Teacher ====================
exports.send_notification = async (request, response) => {
    try {
        await Notification.create(request.body);
        emit_notice('notification-alert', "New Notification");
        response.json({message: "Notification Successfully Sent", status: "success"});
    } catch (error) {
        const errors = errorHandler(error, 'notifications');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Get Notices ====================
exports.get_notifications = async (request, response) => {
    try {
        let query = {};

        if (request.query && request.query.search) {
            query['notification_title'] = {$regex: request.query.search, $options: "i"};
        }else{
            query = request.query;
        }

        const notifications = await Notification.find(query);
        response.json({ notifications });
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}





// ==================== Delete Notice ====================
exports.delete_notice = async (request, response) => {
    try {
        await Notices.findByIdAndDelete(request.body.notice_id);
        response.json({message: "Notice Successfully Deleted", status: "success"});
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}