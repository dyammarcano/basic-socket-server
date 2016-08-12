const User = require('../models/account');


module.exports = (socket, data) => {
  // {"username":"dyam","password":"0111100101101111"}
  const credentials = JSON.parse(data);

  User.findOne({ email: credentials.email }, (err, account) => {
    if (err) {
      socket.emit('message', { error: err });
    }

    if (account === null) {
      socket.emit('message', { error: account });
    }

    socket.emit('message', account);

    if (account.validPassword(credentials.password)) {
      socket.authorize = true;
      socket.account = account.grantAccess();
      socket.emit('authentication', socket.account);
      socket.emit('message', { success: true });
      console.log(`${ socket.id } Is Authorize`);
    } else {
      socket.authorize = false;
      socket.emit('message', { success: false });
      console.log(`${ socket.id } Not authorize`);
    }
  });
};