const mongoose = require('mongoose');
const crypto = require('crypto');
const moment = require('moment');

const AccountSchema = new mongoose.Schema({
  role: {
    type: Number,
    sparse: true,
  },
  first_name: {
    type: String,
    sparse: true,
  },
  second_name: {
    type: String,
    sparse: true,
  },
  first_surname: {
    type: String,
    sparse: true,
  },
  second_surname: {
    type: String,
    sparse: true,
  },
  gender: {
    type: String,
    sparse: true,
  },
  password: {
    type: String,
    sparse: true,
  },
  salt: {
    type: String,
    sparse: true,
  },
  identification: {
    type: Number,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    sparse: true,
  },
  age: {
    type: Number,
    sparse: true,
  },
  phone: {
    type: String,
    sparse: true,
  },
  birth_date: {
    type: String,
    sparse: true,
  },
  title: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  employee_number: {
    type: Number,
    required: true,
  },
  lat: {
    type: String,
    sparse: true,
  },
  lng: {
    type: String,
    sparse: true,
  },
  civil_status: {
    type: Number,
    sparse: true,
  },
  works_from: {
    type: String,
    sparse: true,
  },
  status: {
    type: String,
    default: 'active',
  },
  created: {
    type: String,
    default: moment().locale('us').format(`MM-DD-YYYY HH:mm:ss`),
  },
});

var _this = this;

AccountSchema.methods.setPassword = (data) => {
  _this.salt = crypto.randomBytes(16).toString('hex');
  _this.password = crypto.pbkdf2Sync(data, _this.salt, 1000, 64, 'sha1').toString('hex');
};

AccountSchema.methods.validPassword = (data) => {
  const hash = crypto.pbkdf2Sync(data, _this.salt, 1000, 64, 'sha1').toString('hex');
  console.log(`hash: ${hash}
salt: ${_this.salt}`);
  _this.password === hash;
};

AccountSchema.methods.generateUser = (data) => {
  _this.first_name = data.first_name.toLowerCase();
  _this.second_name = data.second_name.toLowerCase();
  _this.first_surname = data.first_surname.toLowerCase();
  _this.second_surname = data.second_surname.toLowerCase();
  _this.identification = data.identification.toLowerCase();
  _this.email = data.email.toLowerCase();
  _this.age = data.age.toLowerCase();
  _this.phone = data.phone.toLowerCase();
  _this.birth_date = data.birth_date.toLowerCase();
  _this.title = data.title.toLowerCase();
  _this.department = data.department.toLowerCase();
  _this.employee_number = data.employee_number.toLowerCase();
  _this.works_from = data.works_from.toLowerCase();
};

AccountSchema.methods.generateAdmin = (data) => {
  _this.role = data.role.toLowerCase();
  _this.first_name = data.first_name.toLowerCase();
  _this.second_name = data.second_name.toLowerCase();
  _this.first_surname = data.first_surname.toLowerCase();
  _this.second_surname = data.second_surname.toLowerCase();
  _this.identification = data.identification.toLowerCase();
  _this.email = data.email.toLowerCase();
  _this.age = data.age.toLowerCase();
  _this.phone = data.phone.toLowerCase();
  _this.birth_date = data.birth_date.toLowerCase();
  _this.title = data.title.toLowerCase();
  _this.department = data.department.toLowerCase();
  _this.employee_number = data.employee_number.toLowerCase();
  _this.works_from = data.works_from.toLowerCase();
  _this.salt = crypto.randomBytes(16).toString('hex');
  _this.password = crypto.pbkdf2Sync(data.password, _this.salt, 1000, 64).toString('hex');
};

AccountSchema.methods.grantAccess = {
  id: _this._id,
  email: _this.email,
  first_name: _this.first_name,
  first_surname: _this.first_surname,
  department: _this.department,
  role: _this.role,
  status: _this.status,
  token: crypto.randomBytes(16).toString('hex'),
  exp: moment().add(7, 'days').valueOf(),
};

module.exports = mongoose.model('Account', AccountSchema);
