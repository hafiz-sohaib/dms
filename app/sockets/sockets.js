const socketIo = require('socket.io');
const Users = require('../models/users');
const Chats = require('../models/chat');
const GroupChats = require('../models/group-chat');


let io;
let _socket;


exports.init_socket = (server) => {
    io = socketIo(server);

    io.on('connection', async socket => {
        console.log("User connected");
        _socket = socket;
        const user_id = socket.handshake.auth.token;


        // ===== Update User Status =====
        await Users.findByIdAndUpdate(user_id, {isOnline: true});
        socket.broadcast.emit('getUserOnline', user_id);


        // ===== Listening Incomming Message =====
        socket.on('new_message', data => {
            socket.broadcast.emit('load_new_message', data);
        });


        // ===== Listening Incomming Group Message =====
        socket.on('new_group_message', data => {
            socket.broadcast.emit('load_new_group_message', data);
        });


        // ===== Listening Old Messages =====
        socket.on('old_messages', async data => {
            const chats = await Chats.find({$or: [
                {sender_id: data.user_id, receiver_id: data.receiver_id},
                {sender_id: data.receiver_id, receiver_id: data.user_id}
            ]});

            socket.emit('load_old_messages', { chats });
        });
        

        // ===== Listening Old Group Messages =====
        socket.on('old_group_messages', async data => {
            const chats = await GroupChats.find({group_id: data.group_id}).populate('sender_id');
            socket.emit('load_old_group_messages', { chats });
        });



        socket.on('disconnect', async () => {
            const user_id = socket.handshake.auth.token;
            console.log("User disconnected");

            // ===== Update User Status =====
            await Users.findByIdAndUpdate(user_id, {isOnline: false});
            socket.broadcast.emit('getUserOffline', user_id);
        })
    });
}



exports.emit_notice = (event, data) => {
    if (_socket) {
        _socket.broadcast.emit(event, data);
    }
}