const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  from: {
    type: Date,
    default: Date.now
  },
  to: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: true
  },
  url: {
    type: String,
    default: ''
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

module.exports = mongoose.model('Banner', BannerSchema);
