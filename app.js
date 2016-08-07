const server = require('http').createServer();
const io = require('socket.io').listen(server);

io.on('conection', function (socket) {
  console.log("User Connected");

  socket.on('message', function (spark) {
    io.emit('message', spark);
  });
});

server.listen(3000, function () {
  console.log("Server Running...");
});
