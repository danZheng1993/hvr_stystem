const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  title: {
    type: String,
    default: ''
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
    default: new Date()
  }
}, {
  timestamp: true,
});

module.exports = mongoose.model('Banner', BannerSchema);
