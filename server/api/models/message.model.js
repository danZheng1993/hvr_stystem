const mongoose = require('mongoose');
const orderId = require('order-id')('secret');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  id: {
    type: String,
    default: orderId.generate(),
  },
  target: {
    type: String,
    default: 'all',
  },
  targetId: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  }
}, {
  timestamp: true,
});

module.exports = mongoose.model('Messages', MessageSchema);
