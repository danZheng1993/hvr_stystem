const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');
const Code = require('../models/code.model');
const axios = require('axios')
const md5 = require('md5')
const moment = require('moment')
const PERMISSION = require('../constants/permission')

const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

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
          info: user,
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
    role: req.body.role
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
//  tKey = date

  const date = moment()
  const tKey = (date.valueOf() - date.valueOf()%1000) / 1000
  const code = new Code({
    phoneNumber: req.body.phoneNumber,
    code:md5(key),
    created: date.format(),
  });
  Code.updateOne({phoneNumber: code.phoneNumber}, { $set: {code: code.code, created: code.created }}, { upsert : true }).exec()
  .then((newCode) => {
    // axios.post('http://api.mix2.zthysms.com/v2/sendSms', {    
    //   "content": key,
    //   "mobile": "17718500067",
    //   "username": "youyou88hy",
    //   "password": md5( md5("FWhlITd4") + tKey),
    //   tKey : tKey,
    //   "ext": "9999" 
    // }).then((response) => {
    //   console.log(response.data);
    // }, (error) => {
    //   console.log(error);
    // });
    res.json(newCode);
  })
  .catch(next);
}

function checkcode(req, res, next) {
  Code.findOne({ phoneNumber: req.body.phoneNumber })
    .select('phoneNumber code verified')
    .exec()
    .then((code) => {
      if (!code) {
        return res.status(500).json({ message: 'error!' });
      }
      // if (code.verified === true) {
      //   return res.status(500).json({ message: 'You are blocked' });
      // }
      console.log(req.body.code, code)
      return code.authenticate(req.body.code)
      .then(() => {      
        console.log("verify ok", code.verified)
        if (code.verified == false) {
          console.log("new")
          if (req.body.password) {
            const newuser = new User({
              phoneNumber: req.body.phoneNumber,
              password: req.body.password,
              role: req.body.role
            });
            console.log(newuser)
            newuser.save()
            .then((newUser) => {
              const token = jwt.sign({
                _id: newUser._id, // eslint-disable-line
                userName: newUser.userName,
                phoneNumber: newUser.phoneNumber,
                role: newUser.role,
              }, config.jwtSecret, { expiresIn: config.jwtExpires });
      
              res.json({
                info: newUser,
                _id: newUser._id, // eslint-disable-line
                userName: newUser.userName,
                phoneNumber: newUser.phoneNumber,
                role: newUser.role,
                token,
              })
              res.json(newUser);
            })
            .catch(next);
          } else {

          }
          Code.updateOne({phoneNumber: req.body.phoneNumber}, { $set: { "verified" : true } }).exec()  
          .then (() => {
            
          })
        } else {
      
          console.log("old")
          User.findOne({ phoneNumber: +req.body.phoneNumber })    
          .then((user) => {
            
            console.log(user)
            if (!user) {
              return res.status(500).json({ message: 'error!' });
            }
            const token = jwt.sign({
              _id: user._id, // eslint-disable-line
              userName: user.userName,
              phoneNumber: user.phoneNumber,
              role: user.role,
            }, config.jwtSecret, { expiresIn: config.jwtExpires });
    
            res.json({
              info: user,
              _id: user._id, // eslint-disable-line
              userName: user.userName,
              phoneNumber: user.phoneNumber,
              role: user.role,
              token,
            })
          })
          .catch(next)
        }
        })
       .catch(next)
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
