const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const STATUS = require('../constants/status')
const positiveNumber = (distance) => distance > 0;

const MediaSchema = new Schema({
  creator: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  poster: {
    type: Schema.ObjectId,
    ref: 'User',
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
  visits: {
    type: Number,
    default: 0,
  },
  jobID: {
    type: Schema.ObjectId,
    ref: 'Job',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  snapshot: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  },
}, {
  timestamp: true,
});


module.exports = mongoose.model('Media', MediaSchema);
