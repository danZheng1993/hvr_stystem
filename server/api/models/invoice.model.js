const mongoose = require('mongoose');
const STATUS = require('../constants/status')
const Schema = mongoose.Schema;
const positiveNumber = (distance) => distance > 0;

const InvoiceSchema = new Schema({
  sender: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  jobID: {
    type: Schema.ObjectId,
    ref: 'Job',
  },
  type: {
    type: String,
    default: '纸质发票'
  },
  created: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    default: 0,
  },
  headerType: {
    type: String,
    default: '',
  },
  headerContent: {
    type: String,
    default: '',
  },
  taxNumber: {
    type: String,
  },
  isMail: {
    type: Boolean,
    default: false
  },
  mailAddress: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  },
  status: {
    type: String, 
    enum: Object.values(STATUS), 
    default: STATUS.INVOICE_CREATED
  },
}, {
  timestamp: true,
});


module.exports = mongoose.model('Invoice', InvoiceSchema);
