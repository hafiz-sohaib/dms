const Students = require('../../models/student');
const { errorHandler } = require('../../utils/utils');


// ==================== Add New Student ====================
exports.add_student = async (request, response) => {
    try {
        await Students.create(request.body);
        response.json({message: "Student Successfully Added", status: "success"});
    } catch (error) {
        const errors = errorHandler(error, 'students');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Get Students ====================
exports.get_students = async (request, response) => {
    try {
        const { search, sort, order, ...filters } = request.query;
        const query = {};

        if (search) {
            query.student_name = { $regex: search, $options: 'i' };
        }

        const sortOptions = sort || 'student_name';
        const sortOrder = order || 'asc';

        const students = await Students.find({ ...query, ...filters }).sort({ [sortOptions]: sortOrder === 'desc' ? -1 : 1 }).select('-__v').exec();
        response.json({ students });
    } catch (error) {
        console.error(error);
        response.json({ message: 'Something Went Wrong', status: 'error' });
    }
}





// ==================== Update Student ====================
exports.update_student = async (request, response) => {
    try {
        await Students.findByIdAndUpdate(request.params.id, request.body);
        response.json({ message: "Student Successfully Updated", status: "success" });
    } catch (error) {
        const errors = errorHandler(error, 'students');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Delete Student ====================
exports.delete_student = async (request, response) => {
    try {
        await Students.findByIdAndDelete(request.params.id);
        response.json({message: "Student Successfully Deleted", status: "success"});
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}