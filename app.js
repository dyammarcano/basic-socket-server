const server = require('http').createServer();
const io = require('socket.io').listen(server);

io.on('connection', function (spark) {
  console.log("User Connected");

  spark.on('message', function (msg) {
    io.emit('message', msg);
  });
});

server.listen(9800, function () {
  console.log("Server Running...");
});
