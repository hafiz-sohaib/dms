const { emit_notice } = require('../../sockets/sockets');
const Chat = require('../../models/chat');


// ==================== Add New Teacher ====================
exports.chat = async (request, response) => {
    try {
        await Chat.create(request.body);
        response.json({message: "Message Sent", status: "success"});
    } catch (error) {
        console.log(error);
        response.json({message: "Message Sending Failed", status: "error"});
    }
}