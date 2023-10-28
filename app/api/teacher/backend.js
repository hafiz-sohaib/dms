const Teachers = require('../../models/teacher');
const { errorHandler } = require('../../utils/utils');


// ==================== Add New Teacher ====================
exports.add_teacher = async (request, response) => {
    try {
        await Teachers.create(request.body);
        response.json({message: "Teacher Successfully Added", status: "success"});
    } catch (error) {
        const errors = errorHandler(error, 'teachers');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Get Teachers ====================
exports.get_teachers = async (request, response) => {
    try {
        const { search, sort, order, ...filters } = request.query;
        const query = {};

        if (search) {
            query.teacher_name = { $regex: search, $options: 'i' };
        }

        const sortOptions = sort || 'teacher_name';
        const sortOrder = order || 'asc';

        const teachers = await Teachers.find({ ...query, ...filters }).sort({ [sortOptions]: sortOrder === 'desc' ? -1 : 1 }).select('-__v').exec();
        response.json({ teachers });
    } catch (error) {
        console.error(error);
        response.json({ message: 'Something Went Wrong', status: 'error' });
    }
}





// ==================== Update Teacher ====================
exports.update_teacher = async (request, response) => {
    try {
        await Teachers.findByIdAndUpdate(request.params.id, request.body);
        response.json({ message: "Teacher Successfully Updated", status: "success" });
    } catch (error) {
        const errors = errorHandler(error, 'teachers');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Delete Teacher ====================
exports.delete_teacher = async (request, response) => {
    try {
        await Teachers.findByIdAndDelete(request.params.id);
        response.json({message: "Teacher Successfully Deleted", status: "success"});
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}