const server = require('http').createServer();
const io = require('socket.io').listen(server);
const Rx = require('rx');
const Immutable = require('immutable');

var usersMap = Immutable.Map({});

let port = 9810;

server.listen(port, function() {
  console.log(`Rx Socket.io Server on port ${port} is now Running...`);
});

var sourceConnect = Rx.Observable.create(function(observer) {
  io.on('connection', function(socket) {
    //console.log('Client connection notified to server first. Client socketId is ', socket.id);
    socket.emit('my socketId', {'socketId': socket.id, 'connectTime': Date.now()});
    socket.on('client connect', function(data) {
      observer.onNext({'socket': socket, 'data': data, 'event': 'client connect'});
    });
  });

  return function() {
    io.close();
  }
});

var sourceDisconnect = Rx.Observable.create(function(observer) {
  io.on('connection', function(socket) {
    socket.on('disconnect', function(data) {
      observer.onNext({'socketId': socket.id, 'event': 'client disconnect'});
    });
  });

  return function() {
    io.close();
  }
});

var observerConnect = sourceConnect.subscribe((obj) => {
  //obj.socket.emit('new user', obj.data);
  //io.emit('new user', obj.data);
  //console.log('New client connected ', obj.data);
  let socketId = obj.data.socketId;
  usersMap = usersMap.set(socketId, obj.data);
  //console.log(usersMap);
  io.emit('all users', usersMap.toArray());
});

var observerDisconnect = sourceDisconnect.subscribe((obj) => {
  //console.log(usersMap);
  let socketId = obj.socketId;
  //console.log(socketId);
  let user = usersMap.get(socketId);
  //console.log('Client disconnected ', user.socketId, user.nickname);
  usersMap = usersMap.delete(obj.socketId);
  io.emit('all users', usersMap.toArray());
});
