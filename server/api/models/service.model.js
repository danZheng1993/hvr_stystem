const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  name: {
    type: String,
  },
  service: {
    type: String,
  },
}, {
  timestamp: true,
});

module.exports = mongoose.model('Service', ServiceSchema);
