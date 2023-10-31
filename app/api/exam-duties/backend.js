const Exams = require('../../models/exam-duties');
const { errorHandler } = require('../../utils/utils');


// ==================== Add New Exam Duty ====================
exports.set_duty = async (request, response) => {
    try {
        await Exams.create(request.body);
        response.json({message: "Duty Successfully Set", status: "success"});
    } catch (error) {
        const errors = errorHandler(error, 'exam-duties');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Get Exam Duties ====================
exports.get_duties = async (request, response) => {
    try {
        const { search, sort, order, ...filters } = request.query;
        const query = {};

        if (search) {
            query.exam_teacher = { $regex: search, $options: 'i' };
        }

        const sortOptions = sort || 'exam_teacher';
        const sortOrder = order || 'asc';

        const exams = await Exams.find({ ...query, ...filters }).sort({ [sortOptions]: sortOrder === 'desc' ? -1 : 1 }).select('-__v').exec();
        response.json({ exams });
    } catch (error) {
        console.error(error);
        response.json({ message: 'Something Went Wrong', status: 'error' });
    }
}





// ==================== Update Exam Duty ====================
exports.update_duty = async (request, response) => {
    try {
        await Exams.findByIdAndUpdate(request.params.id, request.body);
        response.json({message: "Duty Successfully Updated", status: "success"});
    } catch (error) {
        const errors = errorHandler(error, 'exam-duties');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Delete Exam Duty ====================
exports.delete_duty = async (request, response) => {
    try {
        await Exams.findByIdAndDelete(request.params.id);
        response.json({message: "Duty Successfully Deleted", status: "success"});
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}