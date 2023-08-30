const Users = require('../../models/users');

exports.get_users = async (request, response) => {
    try {
        let query = {};

        if (request.query && request.query.search) {
            query['full_name'] = {$regex: request.query.search, $options: "i"};
        }else{
            query = request.query;
        }

        const users = await Users.find(query);
        response.json({ users, status: "success" });
    } catch (error) {
        console.log(error);
        response.json({ message: "Something Went Wrong", status: "error" });
    }
}





exports.block_user = async (request, response) => {
    try {
        await Users.findByIdAndUpdate(request.body.id, {isBlocked: true});
        response.json({message: "User Successfully Blocked", status: "success" });
    } catch (error) {
        console.log(error);
        response.json({ message: "Something Went Wrong", status: "error" });
    }
}





exports.unblock_user = async (request, response) => {
    try {
        await Users.findByIdAndUpdate(request.body.id, {isBlocked: false});
        response.json({message: "User Successfully Unblocked", status: "success" });
    } catch (error) {
        console.log(error);
        response.json({ message: "Something Went Wrong", status: "error" });
    }
}