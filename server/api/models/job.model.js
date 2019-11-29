const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const STATUS = require('../constants/status')
const positiveNumber = (distance) => distance > 0;

const JobSchema = new Schema({
  ID: {
    type: String
  },
  creator: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now()
  },
  location: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  count: {
    type: Number,
    default: 1,
    validate: [positiveNumber, 'should be bigger than 0'],
  },
  start: {
    type: Date,
    default: Date.now()
  },
  end: {
    type: Date,
    default: Date.now()
  },
  scene: {
    type: String,
    default: ''
  },
  subcategory: {
    type: String,
    default: ''
  },
  services: {
    type: String,
    default: ''
  },

  systembudget: {
    type: Number,
    default: 0,
  },

  budget: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    default: 0,
  },
  upfront: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: '',
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  applicants: {
    type: Array
  },
  hired: {
    type: String,
    default: ''
  },
  feedback: {
    type: String,
    default: ''
  },
  status: { type: String, enum: Object.values(STATUS), default: STATUS.BIDDING },

}, {
  timestamp: true,
});


module.exports = mongoose.model('Job', JobSchema);
