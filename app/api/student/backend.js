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
        let query = {};

        if (request.query && request.query.search) {
            query['student_name'] = {$regex: request.query.search, $options: "i"};
        }else{
            query = request.query;
        }

        const students = await Students.find(query);
        response.json({ students });
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}





// ==================== Update Student ====================
exports.update_student = async (request, response) => {
    try {
        await Students.findByIdAndUpdate(request.body.student_id, request.body);
        response.json({ message: "Student Successfully Updated", status: "success" });
    } catch (error) {
        const errors = errorHandler(error, 'students');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Delete Student ====================
exports.delete_student = async (request, response) => {
    try {
        await Students.findByIdAndDelete(request.body.student_id);
        response.json({message: "Student Successfully Deleted", status: "success"});
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}