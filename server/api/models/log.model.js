const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  userName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  ipAddress: {
    type: String
  },
  logged: {
    type: Date,
    default: new Date()
  }
}, {
  timestamp: true,
});

module.exports = mongoose.model('Log', LogSchema);