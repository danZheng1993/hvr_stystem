const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positiveNumber = (distance) => distance > 0;

const JobSchema = new Schema({
  ID: {
    type: String
  },
  creator: {
    type: String
  },
  ID: {
    type: String
  },
  created: {
    type: Date,
  },
  location: {
    type: String
  },
  category: {
    type: String
  },
  count: {
    type: Number,
    default: 0,
    validate: [positiveNumber, 'should be bigger than 0'],
    default: 1
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  scene: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  services: {
    type: Array,
  },
  budget: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
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
    type: String
  }
}, {
  timestamp: true,
});

module.exports = mongoose.model('Job', JobSchema);
