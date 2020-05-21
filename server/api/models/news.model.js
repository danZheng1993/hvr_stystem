const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  visits: {
    type: Number,
    default: 0,
  },
  setBanner: {
    type: Boolean,
    default: false,
  },
  path: {
    type: String,
  },
  content: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  source: {
    type: String,
    default: ''
  }
}, {
  timestamp: true,
});

module.exports = mongoose.model('News', NewsSchema);
