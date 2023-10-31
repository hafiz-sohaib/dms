const Chat = require('../../models/chat');
const GroupChat = require('../../models/group-chat');


exports.save_chat = async (request, response) => {
    try {
        const chat = await Chat.create(request.body);
        response.json({ message: "Message Sent", status: "success", chat });
    } catch (error) {
        console.error(error);
        response.json({ message: "Something went wrong", status: 'error' });
    }
}




exports.save_group_chat = async (request, response) => {
    try {
        const data = await GroupChat.create(request.body);
        const chat = await GroupChat.find({_id: data._id}).populate('sender_id');
        response.json({ message: "Message Sent", status: "success", chat });
    } catch (error) {
        console.error(error);
        response.json({ message: "Something went wrong", status: 'error' });
    }
}