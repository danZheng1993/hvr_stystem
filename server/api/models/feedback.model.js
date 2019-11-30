const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
  sender: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now()
  },
  content: {
    type: String,
    default: '',
  },
}, {
  timestamp: true,
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
