const moment = require('moment');

module.exports = (io, connections) => {
  io.of('/').on('connection', (socket) => {
    console.log(`Client ${socket.id} is Connected to Root namespace`);
    connections.clients.push(socket);

    socket.on('authentication', function (data) {
      if (data === '18885026') {
        socket.authorize = true;
        console.log(`${socket.id} Is Authorize`);
        socket.emit('authentication', data);
      } else {
        console.log(`${socket.id} Not authorize`);
      }
    });

    setInterval(() => {
      socket.emit('log', moment().locale('us').format(`MM-DD-YYYY HH:mm:ss`));
    }, 500);

    socket.on('join', (room) => {
      console.log(`joining room ${room}`);
      socket.join(room);
    });

    socket.on('leave', (room) => {
      console.log(`leaving room ${room}`);
      socket.leave(room);
    });

    socket.on('login', (data) => {
      require('../modules/login')(socket, data);
    });

    setTimeout(() => {
      socket.emit('stats', { 'new in root': socket.id, total: connections.length });
    }, 500);

    socket.on('disconnect', (msg) => {
      console.log(`Client ${socket.id} is Disconnect to Root namespace`);
      connections.clients.splice(connections.clients.indexOf(socket), 1);
    });
  });
};
