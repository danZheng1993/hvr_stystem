const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingSchema = new Schema({
  splash: {
    type: String,
    default: 'background.png'
  },
  popularSearch: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  scene: {
    type: String,
    default: ''
  },
  subcategory: {
    type: String,
    default: ''
  },
  upfrontRate: {
    type: Number,
    default: 20
  },
  feeRate: {
    type: Number,
    default: 5
  },
  panoramaPrice: {
    type: Number,
    default: 99
  },
  liveVRHourlyPrice: {
    type: Number,
    default: 123
  },
  service: {
    type: String,
    default: ''
  },
}, {
  timestamp: true,
});

module.exports = mongoose.model('Setting', SettingSchema);
