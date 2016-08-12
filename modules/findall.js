const User = require('../models/account');

module.exports = (socket, data) => {

  var user = socket.account;

  if (user.role !== 200) {

    User.find({
      _id: {
        $ne: user.id,
      },
      password: {
        $exists: false,
      },
    }, '-password -salt -__v -created', (err, account) => {
      if (err) {
        throw err;
      }

      send(res, 200, account);
    });
  } else {

    User.find({
      department: {
        $eq: user.department,
      }, _id: {
        $ne: user.id,
      },
      password: {
        $exists: false,
      },
    }, '-password -salt -__v -created', (err, account) => {
      if (err) {
        throw err;
      }

      send(res, 200, account);
    });
  }
};
