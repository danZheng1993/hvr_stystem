const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  key: {
    type: String,
  },
  value: {
    type: String,
  },
}, {
  timestamp: true,
});

module.exports = mongoose.model('Setting', SettingSchema);
