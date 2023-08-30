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
        let query = {};

        if (request.query && request.query.search) {
            query['teacher_name'] = {$regex: request.query.search, $options: "i"};
        }else{
            query = request.query;
        }

        const teachers = await Teachers.find(query);
        response.json({ teachers });
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}





// ==================== Update Teacher ====================
exports.update_teacher = async (request, response) => {
    try {
        await Teachers.findByIdAndUpdate(request.body.teacher_id, request.body);
        response.json({ message: "Teacher Successfully Updated", status: "success" });
    } catch (error) {
        const errors = errorHandler(error, 'teachers');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Delete Teacher ====================
exports.delete_teacher = async (request, response) => {
    try {
        await Teachers.findByIdAndDelete(request.body.teacher_id);
        response.json({message: "Teacher Successfully Deleted", status: "success"});
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}