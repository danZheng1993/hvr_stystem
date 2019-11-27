const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');
const Code = require('../models/code.model');
const axios = require('axios')
const md5 = require('md5')
const moment = require('moment')
const PERMISSION = require('../constants/permission')
const ip = require('ip')

function login(req, res, next) {
  User.findOne({ phoneNumber: req.body.phoneNumber })
    .select('_id password phoneNumber userName location role permission photo overview contacts collections attentions')
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
  console.log("signup")
  const user = new User({
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    role: req.body.role
  });

  return user.save()
  .then((newUser) => {
    const token = jwt.sign({
      _id: newUser._id, // eslint-disable-line
      userName: newUser.userName,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
    }, config.jwtSecret, { expiresIn: config.jwtExpires });
    console.log(newUser)
    let data = {
      username: newUser._id,
      name: newUser._id,
      password: token.slice(0,8)
    }
    console.log(JSON.stringify(data), `http://${ip.address()}:9090/plugins/restapi/v1/users`)
    axios.request({
      url: `http://${ip.address()}:9090/plugins/restapi/v1/users`,
      method: 'post',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'tzsMD3lBtG5ESTEA'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: JSON.stringify(data),
    })
    res.json({
      info: newUser,
      _id: newUser._id, // eslint-disable-line
      userName: newUser.userName,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
      token,
    });
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
            return signup(req,res,next)
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
