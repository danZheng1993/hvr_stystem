const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const bcrypt = require('bcryptjs');
const ROLES = require('../constants/role');
const PERMISSION = require('../constants/permission')

const Schema = mongoose.Schema;
const SALT_ROUNDS = 10;

const userSchema = new Schema({
  phoneNumber: { type: Number, unique:true, required: true, trim: true, default: '' },
  userName: { type: String, trim: true, default: '' },
  location: { type: String, trim: true, default: '' },
  overview: { type: String, trim: true, default: '' },
  password: { type: String, select: false, required: true },
  photo: { type: String, trim: true, default: 'default.png' },
  contacts: {type: Array},
  
  frontID: { type: String, select: false, trim: true,},
  backID: { type: String, select: false, trim: true,},
  companyName: { type: String,},
  companyLicense: { type: String, select: false,},
  balance: { type: Number, trim: true, default: 0 }, 

  collections: {type: Array},
  attentions: {type: Array},

  role: { type: String, enum: Object.values(ROLES), default: ROLES.PROVIDER },
  permission: { type: String, enum: Object.values(PERMISSION), default: PERMISSION.NOT_ALLOWED },
});

userSchema.methods.hashPassword = function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        return reject('Failed to generate hash');
      }
      return resolve(hash);
    });
  });
};

userSchema.methods.authenticate = function authenticate(password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password)
      .then((allow) => {
        if (!allow) return reject();
        return resolve();
      })
      .catch(reject);
  });
};

userSchema.pre('save', function preSave(next) {
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

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);
