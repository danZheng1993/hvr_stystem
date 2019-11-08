const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');
const Code = require('../models/code.model');

const PERMISSION = require('../constants/permission')

function login(req, res, next) {
  User.findOne({ phoneNumber: req.body.phoneNumber })
    .select('_id password phoneNumber userName role permission')
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(500).json({ message: 'phoneNumber or password does not match' });
      }
      if (user.permission === PERMISSION.BLOCKED) {
        return res.status(500).json({ message: 'You are blocked' });
      }
      return user.authenticate(req.body.password)
      .then(() => {
        const token = jwt.sign({
          _id: user._id, // eslint-disable-line
          userName: user.userName,
          phoneNumber: user.phoneNumber,
          role: user.role,
        }, config.jwtSecret, { expiresIn: config.jwtExpires });

        res.json({
          _id: user._id, // eslint-disable-line
          userName: user.userName,
          phoneNumber: user.phoneNumber,
          role: user.role,
          token,
        });
      })
      .catch(() => {
        res.status(500).json({ message: 'phoneNumber or password does not match' });
      });
    })
    .catch(next);
}

function signup(req, res, next) {
  const user = new User({
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });

  user.save()
  .then((newUser) => {
    res.json(newUser);
  })
  .catch(next);
}

function sendcode(req, res, next) {
  let min = 1000, max = 9999
  let key = Math.floor(Math.random() * (max - min + 1) ) + min;
  console.log(key)
  const code = new Code({
    phoneNumber: req.body.phoneNumber,
    code: key,
  });

  code.save()
  .then((newCode) => {
    res.json(newCode);
  })
  .catch(next);
}

function checkcode(req, res, next) {
  Code.findOne({ phoneNumber: req.body.phoneNumber })
    .select('_id phoneNumber code verified')
    .exec()
    .then((code) => {
      if (!code) {
        return res.status(500).json({ message: 'error!' });
      }
      // if (code.verified === true) {
      //   return res.status(500).json({ message: 'You are blocked' });
      // }
      return code.authenticate(req.body.code)
      .then(() => {
        Code.updateOne({phoneNumber: req.body.phoneNumber}, { $set: { "verified" : true } }).exec()
        .then(() => {
          res.json({         
            phoneNumber: code.phoneNumber,
            verified: code.verified,
          });
          console.log("verify ok")
        })
       .catch(next)
      })
      .catch(() => {
        res.status(500).json({ message: 'Invalid code' });
      });
    })
    .catch(next);
  }
module.exports = {
  login,
  signup,
  sendcode,
  checkcode
};
