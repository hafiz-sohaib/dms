const Groups = require('../../models/group');


exports.create_group = async (request, response) => {
    try {
        await Groups.create(request.body);
        response.json({ message: "Group successfully created", status: "success" });
    } catch (error) {
        console.error(error);
        response.json({ message: "Something went wrong", status: 'error' });
    }
}