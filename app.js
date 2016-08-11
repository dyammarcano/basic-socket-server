const server = require('http').createServer();
const io = require('socket.io').listen(server);
const cache = require('./lib/memstorage');
const message = require("./modules/message");


users = [];
connections = [];

cache.put('foo', 'bar');
console.log(cache.get('foo'));

let port = 9800;

server.listen(port, function() {
  console.log(`Socket.io Server on port ${port} is now Running...`);
});

io.on('connection', function(spark) {
  console.log(`${new Date()}: ${spark.id} Connect`);
  connections.push(spark);

  spark.on('disconnect', function(msg) {
    connections.splice(connections.indexOf(spark), 1);
    console.log(`${new Date()}: ${spark.id} Disconnect`);
  });

  message(io, spark);
});
