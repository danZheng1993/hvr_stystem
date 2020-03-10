const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AwardSchema = new Schema({
  users: {
    type: Array,
  },
  from: {
    type: Date,
    default: Date.now
  },
  to: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
  },
  image: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  timestamp: true,
});

module.exports = mongoose.model('Award', AwardSchema);
