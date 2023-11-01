const Opportunities = require('../../models/opportunities');
const { errorHandler } = require('../../utils/utils');


exports.upload_opportunity = async (request, response) => {
    try {
        await Opportunities.create(request.body);
        response.json({message: 'Opportunity Successfully Uploaded', status: 'success'});
    } catch (error) {
        const errors = errorHandler(error, 'opportunities');
        response.json({message: errors, status: 'error'});
    }
}





exports.get_opportunities = async (request, response) => {
    try {
        let query = {};

        if (request.query && request.query.search) {
            query = { opportunity_title: { $regex: request.query.search, $options: "i" } };
        }
        else if (request.query) {
            query = request.query;
        }

        const opportunities = await Opportunities.find(query);
        return response.json({opportunities});
    } catch (error) {
        console.log(error);
    }
}





exports.delete_opportunities = async (request, response) => {
    try {
        await Opportunities.findByIdAndDelete(request.params.id);
        return response.json({message: "Opportunities deleted successfully"});
    } catch (error) {
        console.log(error);
        return response.json({message: "Something went wrong"});
    }
}