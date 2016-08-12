var User           = require('../models/account');
var cfg            = require('../config');

var send = function (res, status, content) {
  res.status(status);
  res.json(content);
};

var roles = function (req, res) {

  if (req.user.role === 200) {
    return send(res, 401, { access: false });
  }
};

module.exports.profile = function (req, res) {

  if (req.params.id !== undefined) {

    User.findById(req.params.id, /*"-password -salt -__v -created",*/ function (err, account) {
      if (err) {
        throw err;
      }

      send(res, 200, account);
    });
  } else {
    User.findById(req.user.id, /*"-password -salt -__v -created",*/ function (err, account) {
      if (err) {
        throw err;
      }

      send(res, 200, account);
    });
  }
};

module.exports.allAdmin = function (req, res) {

  roles(req, res);

  if (req.user.role !== 200) {

    User.find({ _id: { $ne: req.user.id }, password: { $exists: true } }, cfg.patern.hide, function (err, account) {
      if (err) {
        throw err;
      }

      send(res, 200, account);
    });
  } else {

    User.find({ department: { $eq: req.user.department }, _id: { $ne: req.user.id }, password: { $exists: true } }, cfg.patern.hide, function (err, account) {
      if (err) {
        throw err;
      }

      send(res, 200, account);
    });
  }
};

module.exports.allUser = function (req, res) {

  if (req.user.role !== 200) {

    User.find({ _id: { $ne: req.user.id }, password: { $exists: false } }, '-password -salt -__v -created', function (err, account) {
      if (err) {
        throw err;
      }

      send(res, 200, account);
    });
  } else {

    User.find({ department: { $eq: req.user.department }, _id: { $ne: req.user.id }, password: { $exists: false } }, '-password -salt -__v -created', function (err, account) {
      if (err) {
        throw err;
      }

      send(res, 200, account);
    });
  }
};

module.exports.addAdmin = function (req, res) {

  roles(req, res);

  if (Object.keys(req.query).length >= 14) {

    var obj = new User();

    obj.generateAdmin(req.query);

    obj.save(function (err) {
      if (err) {
        send(res, 400, { exist: true });
      } else {
        send(res, 200, { saved: true });
      }
    });
  } else {
    send(res, 400, { fields: false });
  }
};

module.exports.addUser = function (req, res) {

  roles(req, res);

  if (Object.keys(req.query).length >= 13) {

    var obj = new User();

    obj.generateUser(req.query);

    obj.save(function (err) {
      if (err) {
        send(res, 400, { exist: true });
      } else {
        send(res, 200, { saved: true });
      }
    });
  } else {
    send(res, 400, { fields: false });
  }
};

module.exports.update = function (req, res) {

  roles(req, res);

  User.findByIdAndUpdate(req.query.id, req.query.account, function (err, user) {
    if (err) {
      throw err;
    }

    send(res, 200, user);
  });
};

module.exports.delete = function (req, res) {

  roles(req, res);

  User.findByIdAndRemove(req.query.id, function (err) {
    if (err) {
      throw err;
    }

    send(res, 200, { remove: true });
  });
};

module.exports.suspend = function (req, res) {

  roles(req, res);

  User.findByIdAndUpdate(req.query.id, { status: 'suspend' }, function (err, user) {
    if (err) {
      throw err;
    }

    send(res, 200, user);
  });
};

module.exports.active = function (req, res) {

  roles(req, res);

  User.findByIdAndUpdate(req.query.id, { status: 'active' }, function (err, user) {
    if (err) {
      throw err;
    }

    send(res, 200, user);
  });
};
