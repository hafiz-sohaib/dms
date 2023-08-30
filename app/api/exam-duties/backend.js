const Exams = require('../../models/exam-duties');
const { errorHandler } = require('../../utils/utils');


// ==================== Add New Teacher ====================
exports.set_duty = async (request, response) => {
    try {
        await Exams.create(request.body);
        response.json({message: "Duty Successfully Set", status: "success"});
    } catch (error) {
        const errors = errorHandler(error, 'exam-duties');
        response.json({message: errors, status: "error"});
    }
}




// ==================== Get Teachers ====================
exports.get_duties = async (request, response) => {
    try {
        let query = {};

        if (request.query && request.query.search) {
            query['exam_teacher'] = {$regex: request.query.search, $options: "i"};
        }else{
            query = request.query;
        }

        const exams = await Exams.find(query);
        response.json({ exams });
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}





// ==================== Add New Teacher ====================
exports.update_duty = async (request, response) => {
    try {
        await Exams.findByIdAndUpdate(request.body.exam_id, request.body);
        response.json({message: "Duty Successfully Updated", status: "success"});
    } catch (error) {
        const errors = errorHandler(error, 'exam-duties');
        response.json({message: errors, status: "error"});
    }
}





// ==================== Delete Teacher ====================
exports.delete_duty = async (request, response) => {
    try {
        await Exams.findByIdAndDelete(request.body.exam_id);
        response.json({message: "Duty Successfully Deleted", status: "success"});
    } catch (error) {
        console.log(error);
        response.json({message: "Something Went Wrong", status: "error"});
    }
}