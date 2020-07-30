const mongoose = require('mongoose');
const orderid = require('order-id')('secret');

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
  },
  category: {
    type: String,
    default: '',
  },
  serviceCategory: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: '',
  },
  sceneCount: {
    type: String,
    default: '',
  },
  sceneType: {
    type: String,
    default: '',
  },
  requirements: {
    type: String,
    default: '',
  },
  otherRequirements: {
    type: String,
    default: '',
  },
  downPaymentTime: {
    type: Date,
    default: null,
  },
  balancePaymentTime: {
    type: Date,
    default: null,
  }
}, {
  timestamp: true,
});

module.exports = mongoose.model('Orders', OrderSchema);
