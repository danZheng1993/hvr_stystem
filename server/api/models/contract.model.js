const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
  first: {
    type: String,
  },
  second: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now
  }
}, {
  timestamp: true,
});

module.exports = mongoose.model('Contract', ContractSchema);
