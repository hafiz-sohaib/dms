const socketIo = require('socket.io');
const Users = require('../models/users');

let io;
let _socket;


exports.init_socket = (server) => {
    io = socketIo(server);

    io.on('connection', socket => {
        console.log("User connected");
        _socket = socket;
        const user_id = socket.handshake.auth.token;

        get_chat_users(user_id);
    });
}



exports.emit_notice = (event, data) => {
    if (_socket) {
        _socket.emit(event, data);
    }
}



async function get_chat_users(user_id) {
    if (_socket) {
        try {
            const users = await Users.find({_id: {$nin: [user_id]}, role: "¥teacher¥"});
            _socket.emit('chat_users', users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
}