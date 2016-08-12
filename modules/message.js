const print = require('./print');

module.exports = function (io, spark) {
    io.emit('message', {
        client: spark.id,
        date: new Date(),
      });

    // setInterval(function () {
    //     io.emit('message', 'ping');
    // }, 3000);

    spark.on('message', function (msg) {
      print(msg);
      io.emit('message', msg);
    });
  };
