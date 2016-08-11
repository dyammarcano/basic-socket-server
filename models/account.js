var cfg            = require('../config'); 
var mongoose       = require('mongoose');
var crypto         = require('crypto');
var moment         = require('moment');
var jwt            = require('jsonwebtoken');


var AccountSchema = new mongoose.Schema({
  role: {
    type: Number,
    sparse: true
  },
  first_name: {
    type: String,
    sparse: true
  },
  second_name: {
    type: String,
    sparse: true
  },
  first_surname: {
    type: String,
    sparse: true
  },
  second_surname: {
    type: String,
    sparse: true
  },
  gender: {
    type: String,
    sparse: true
  },
  password: {
    type: String,
    sparse: true
  },
  salt: {
    type: String,
    sparse: true
  },
  identification: {
    type: Number,
    unique: true,
    required : true
  },
  email: {
    type: String,
    sparse: true
  },
  age: {
    type: Number,
    sparse: true
  },
  phone: {
    type: String,
    sparse: true
  },
  birth_date: {
    type: String,
    sparse: true
  },
  title: {
    type: String,
    required : true
  },
  department: {
    type: String,
    required : true
  },
  employee_number: {
    type: Number,
    required : true
  },
  lat: {
    type: String,
    sparse: true
  },
  lng: {
    type: String,
    sparse: true
  },
  civil_status: {
    type: Number,
    sparse: true
  },
  works_from: {
    type: String,
    sparse: true
  },
  status: { 
    type: String, 
    default: 'active' 
  },
  created: { 
    type: String, 
    default: moment().locale('es').format("dddd, MMMM Do YYYY, HH:mm:ss")
  },
});

AccountSchema.methods.setPassword = function(raw_password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(raw_password, this.salt, 1000, 64).toString('hex');
};

AccountSchema.methods.validPassword = function(raw_password) {
  return this.password === crypto.pbkdf2Sync(raw_password, this.salt, 1000, 64).toString('hex');
};

AccountSchema.methods.generateUser = function(data) {
  this.first_name      = data.first_name.toLowerCase();
  this.second_name     = data.second_name.toLowerCase();
  this.first_surname   = data.first_surname.toLowerCase();
  this.second_surname  = data.second_surname.toLowerCase();
  this.identification  = data.identification.toLowerCase();
  this.email           = data.email.toLowerCase();
  this.age             = data.age.toLowerCase();
  this.phone           = data.phone.toLowerCase();
  this.birth_date      = data.birth_date.toLowerCase();
  this.title           = data.title.toLowerCase();
  this.department      = data.department.toLowerCase();
  this.employee_number = data.employee_number.toLowerCase();
  this.works_from      = data.works_from.toLowerCase();
};

AccountSchema.methods.generateAdmin = function(data) {
  this.role            = data.role.toLowerCase();
  this.first_name      = data.first_name.toLowerCase();
  this.second_name     = data.second_name.toLowerCase();
  this.first_surname   = data.first_surname.toLowerCase();
  this.second_surname  = data.second_surname.toLowerCase();
  this.identification  = data.identification.toLowerCase();
  this.email           = data.email.toLowerCase();
  this.age             = data.age.toLowerCase();
  this.phone           = data.phone.toLowerCase();
  this.birth_date      = data.birth_date.toLowerCase();
  this.title           = data.title.toLowerCase();
  this.department      = data.department.toLowerCase();
  this.employee_number = data.employee_number.toLowerCase();
  this.works_from      = data.works_from.toLowerCase();
  this.salt            = crypto.randomBytes(16).toString('hex');
  this.password        = crypto.pbkdf2Sync(data.password, this.salt, 1000, 64).toString('hex');
};

AccountSchema.methods.generateJwt = function() {
  return jwt.sign({
    id:            this._id,
    email:         this.email,
    first_name:    this.first_name,
    first_surname: this.first_surname,
    department:    this.department,
    role:          this.role,
    status:        this.status,
    exp:           moment().add(7, 'days').valueOf(),
  }, cfg.secret);
};

module.exports = mongoose.model('Account', AccountSchema);