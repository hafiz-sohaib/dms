const socketIo = require('socket.io');
let io;
let _socket;


exports.init_socket = (server) => {
    io = socketIo(server);

    io.on('connection', socket => {
        console.log("User connected");
        _socket = socket;
    });
}



exports.emit_notice = (event, data) => {
    if (_socket) {
        _socket.emit(event, data);
    }
}