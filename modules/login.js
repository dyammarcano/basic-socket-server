//validate = require('./validate');

module.exports = function (io, spark) {
  spark.on("login", function (data) {
    validate(data) {
      io.sockets.emit("login_success", data);
    }
  });
};