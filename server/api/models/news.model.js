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
  content: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: new Date()
  },
  source: {
    type: String,
    default: ''
  }
}, {
  timestamp: true,
});

module.exports = mongoose.model('News', NewsSchema);
