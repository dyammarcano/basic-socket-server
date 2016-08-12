var User           = require('../models/account');
var cfg            = require('../config');

module.exports = {
  auth: function (data) {

    if (data.email !== undefined && data.password !== undefined) {

      User.findOne({ email: data.email }, function (err, account) {
        if (err) {
          return ['errors', true];
        }

        if (!account) {
          throw account;
        }

        if (account.validPassword(data.password)) {
          return ['token', account.generateJwt()];
        } else {
          return ['authentication', 'error'];
        }
      });
    } else {
      return ['error', 'All fields required '];
    }
  },
};
