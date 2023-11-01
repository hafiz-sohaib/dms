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
        await Users.findByIdAndUpdate(request.params.id, {isBlocked: true});
        response.json({message: "User Successfully Blocked", status: "success" });
    } catch (error) {
        console.log(error);
        response.json({ message: "Something Went Wrong", status: "error" });
    }
}





exports.unblock_user = async (request, response) => {
    try {
        await Users.findByIdAndUpdate(request.params.id, {isBlocked: false});
        response.json({message: "User Successfully Unblocked", status: "success" });
    } catch (error) {
        console.log(error);
        response.json({ message: "Something Went Wrong", status: "error" });
    }
}





exports.update_password = async (request, response) => {
    try {;
        const { password } = request.body;
        if (!password) return response.json({ message: "Password is required", status: "error" });

        const user = await Users.findById(response.locals.user._id);
        if (!user) return response.json({ message: "User not found", status: "error" });

        user.password = password;
        await user.save();

        response.clearCookie('_dms', { httpOnly: true, secure: true });
        response.json({ message: "Password changed successfully", status: "success" });
    } catch (error) {
        console.error(error);
        response.json({ message: "Something Went Wrong", status: "error" });
    }
};