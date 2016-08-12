var mongoose   = require('mongoose');

var AccessSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  schedule: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Access', AccessSchema);
