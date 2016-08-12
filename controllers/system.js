var User           = require('../models/account');
var cfg            = require('../config');

var send = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.login = function (req, res) {

  if (req.query.email !== undefined && req.query.password !== undefined) {

    User.findOne({ email: req.query.email }, function (err, account) {
      if (err) {
        send(res, 400, { errors: true });
      }

      if (!account) {
        throw account;
      }

      if (account.validPassword(req.query.password)) {
        send(res, 200, { token: account.generateJwt() });
      } else {
        send(res, 400, { authentication: 'error' });
      }
    });
  } else {
    send(res, 400, { error: 'All fields required ' });
  }
};

module.exports.info = function (req, res) {
  send(res, 200, cfg.routes);
};

module.exports.status = function (req, res) {
  send(res, 200, { status: cfg.api });
};

module.exports.fam = function (req, res) {

};
