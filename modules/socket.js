const io = require('socket.io');

users = [];
connections = [];

io.on('connection', function (spark) {
    console.log('%s: %s Connect', new Date(), spark.id);
    connections.push(spark);

    spark.broadcast.emit('user connected');

    spark.on('device', function (msg) {
      console.log('Not authorized', msg);
    });

    spark.on('message', function (msg) {
        console.log('Echo:', msg);
        io.emit('message', msg);
      });

    spark.on('chat', function (msg) {
      console.log('Echo:', msg);
      io.emit('message', msg);
    });

    spark.on('authentication', function (msg, cb) {
      cb();
    });

    spark.on('account', function (msg) {
      console.log('Echo:', msg);
      io.emit('message', msg);
    });

    spark.on('disconnect', function (msg) {
      connections.splice(connections.indexOf(spark), 1);
      console.log('%s: %s Disconnect', new Date(), spark.id);
    });
  });

module.exports = io;
