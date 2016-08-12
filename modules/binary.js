const ss = require('socket.io-stream');
const print = require('./print');

module.exports = function (io, spark) {
    ss(spark).on('binary', function (stream, data) {
        print('receive binary file');
      });
  };
