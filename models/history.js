var mongoose       = require('mongoose');
var moment         = require('moment');

var HistorySchema = new mongoose.Schema({
  identification: {
    type: Number,
    required: true,
  },
  created: {
    type: String,
    default: moment().locale('es').format('dddd, MMMM Do YYYY, HH:mm:ss'),
  },
});

module.exports = mongoose.model('History', HistorySchema);
