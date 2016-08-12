const server = require('http').createServer();
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const dbname = "mongodb://localhost/hotel";

mongoose.connect(dbname);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log(`Mongoose connected to ${dbname}`);
});

mongoose.connection.on('error', function(err) {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', function() {
  console.log(`Mongoose disconnected`);
});

/*require('socketio-auth')(io, {
  authenticate: authenticate,
  postAuthenticate: postAuthenticate,
  timeout: 60000
});*/



function postAuthenticate(socket, data) {
  User.findOne({ email: data.email }, function(err, account) {
    socket.client.user = account;
  });
}

sessions = [];
logs = [];
clients = [];
users = [];

connections = {
  sessions,
  clients,
  logs,
  users
};

let port = 9801;

server.listen(port, () => {
  console.log(`Socket.io Server on port ${ port } is now Running...`);
});

/*root room socket*/
require("./rooms/root")(io, connections);

/*pop room socket*/
require("./rooms/pop")(io, connections);