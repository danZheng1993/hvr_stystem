const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DatabaseSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  },
}, {
  timestamp: true,
});

module.exports = mongoose.model('Database', DatabaseSchema);
