const fs = require('fs')

module.exports = io => {
    io.on('connection', socket => {
        console.log(socket.id);

        socket.on('coords:send', data => {
            console.log(data);
        })

        socket.on('disconnect', () => {
            console.log('', socket.id);
        })
    });
}