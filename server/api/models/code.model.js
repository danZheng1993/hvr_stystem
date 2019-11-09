const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;
const SALT_ROUNDS = 10;

const codeSchema = new Schema({
  phoneNumber: { type: Number, required: true, trim: true, default: '' },
  code: { type: String, select: false },
  verified: { type: Boolean, default: false },
  created: {type:Date}
});

codeSchema.methods.hashPassword = function hashPassword(code) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(code, SALT_ROUNDS, (err, hash) => {
      if (err) {
        return reject('Failed to generate hash');
      }
      return resolve(hash);
    });
  });
};

codeSchema.methods.authenticate = function authenticate(code) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(code, this.code)
      .then((allow) => {
        if (!allow) return reject();
        return resolve();
      })
      .catch(reject);
  });
};

codeSchema.pre('save', function preSave(next) {
  if (this.code && this.isModified('code')) {
    this.code = this.hashPassword(this.code)
    .then((code) => {
      this.code = code;
      next();
    })
    .catch(next);
  } else {
    next();
  }
});
codeSchema.pre('updateOne', function preSave(next) {
  if (this.code && this.isModified('code')) {
    this.code = this.hashPassword(this.code)
    .then((code) => {
      this.code = code;
      next();
    })
    .catch(next);
  } else {
    next();
  }
});

codeSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Code', codeSchema);
