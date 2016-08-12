var mongoose       = require('mongoose');
var moment         = require('moment');

var AccessSchema = new mongoose.Schema({
  identification: {
    type: Number,
    unique: true,
    required: true,
  },
  ingress: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
  },
});

AccessSchema.methods.grantAccess = function () {
  this.time = moment().locale('es').format('dddd, MMMM Do YYYY, HH:mm:ss');
  this.ingress = !this.ingress;
};

module.exports = mongoose.model('Access', AccessSchema);
