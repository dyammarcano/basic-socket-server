module.exports = function (io, chat) {
  chat.on('disconnect', function (msg) {
    connections.splice(connections.indexOf(chat), 1);
    console.log('%s: %s Disconnect', new Date(), spark.id);
  });
};
