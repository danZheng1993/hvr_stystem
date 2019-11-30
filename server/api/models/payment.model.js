const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const bcrypt = require('bcryptjs');
const ROLES = require('../constants/role');
const PERMISSION = require('../constants/permission')
const positiveNumber = (distance) => distance > 0;

const Schema = mongoose.Schema;
const SALT_ROUNDS = 10;

const paymentSchema = new Schema({
  from: {     type: Schema.ObjectId,
    ref: 'User', required: true, trim: true},
  to: {     type: Schema.ObjectId,
    ref: 'User', required: true, trim: true},
  created: { type: Date, default: new Date() },
  amount: { type: Number, required: true, validate: [positiveNumber, 'should be bigger than 0']},
  type: {type: String},
  content: {type: String}
});

paymentSchema.pre('save', function preSave(next) {
  if (this.password && this.isModified('password')) {
    this.password = this.hashPassword(this.password)
    .then((password) => {
      this.password = password;
      next();
    })
    .catch(next);
  } else {
    next();
  }
});

paymentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Payment', paymentSchema);
