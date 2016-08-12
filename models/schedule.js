var mongoose   = require('mongoose');

var ScheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  schedule: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
