const Opportunities = require('../../models/opportunities');
const { errorHandler } = require('../../utils/utils');


exports.upload_opportunity = async (request, response) => {
    try {
        const data = {
            ...request.body,
            opportunity_file: (request.files.length > 0) ? request.files.opportunity_file.map(file => file.originalname)[0] : "",
            opportunity_url_data: (response.locals.openGraph) ? response.locals.openGraph : ""
        };

        delete data.opportunity_type;

        await Opportunities.create(data);
        response.json({message: 'Opportunity Successfully Uploaded', status: 'success'});
    } catch (error) {
        console.log(error);
        const errors = errorHandler(error, 'opportunities');
        response.json({message: errors, status: 'success'});
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