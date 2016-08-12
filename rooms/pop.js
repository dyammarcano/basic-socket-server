module.exports = (io, connections) => {
  io.of('/pop').on('connection', (socket) => {
    console.log(`Client ${ socket.id } is Connected to Pop namespace`);

    let data = { 'new in pop': socket.id };

    socket.on('echo', (msg) => {
      console.log(`echo: ${msg}`);
      socket.emit('message', msg);

    });

    /*setInterval(() => {
      connections.logs.push({ datetime: new Date() });
      socket.emit('message', connections.logs.length);
    }, 1000);*/

    socket.emit('stats1', data);

    io.sockets.in('pop').emit('stats', data);

    socket.on('disconnect', (msg) => {
      console.log(`Client ${ socket.id } is Disconnect to Pop namespace`);
    });
  });
};