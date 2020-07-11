const mongoose = require('mongoose');
import orderid = require('order-id')('secret');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderNumber: {
    type: String,
    default: orderid.generate(),
  },
  choice: {
    type: String,
    default: ''
  },
  clientId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  clientPhoneNumber: {
    type: String,
    required: true,
  },
  providerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  providerPhoneNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: Number,
    default: 'WePay',
    required: true,
  },
  orderStatus: {
    type: String,
    default: 'initiated',
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

module.exports = mongoose.model('Orders', OrderSchema);
