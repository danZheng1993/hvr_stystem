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
    default: new Date()
  },
}, {
  timestamp: true,
});

module.exports = mongoose.model('Database', DatabaseSchema);
