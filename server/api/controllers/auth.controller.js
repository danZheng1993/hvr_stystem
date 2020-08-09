const jwt = require('jsonwebtoken');
const axios = require('axios')
const md5 = require('md5')
const moment = require('moment')
const ip = require('ip')
const config = require('../../config');
const User = require('../models/user.model');
const Code = require('../models/code.model');
const Log = require('../models/log.model');
const PERMISSION = require('../constants/permission')
const ROLE = require('../constants/role')

function getClientIp(req) {
  let ipAddress;
  // The request may be forwarded from local web server.
  const forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {
    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    const forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // If request was not forwarded
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

function login(req, res, next) {
  User.findOne({ phoneNumber: req.body.phoneNumber })
    .select('_id password phoneNumber userName location role permission photo overview contacts collections attentions balance')
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(500).json({ message: 'phoneNumber or password does not match' });
      }
      if (user.role !== ROLE.CLIENT && user.role !== ROLE.PROVIDER) {
        return res.status(401).json({ message: 'You are not authorized' });
      }
      if (user.permission === PERMISSION.BLOCKED) {
        return res.status(401).json({ message: 'You are blocked' });
      }
      return user.authenticate(req.body.password)
      .then(() => {
        const token = jwt.sign({
          _id: user._id, // eslint-disable-line
          userName: user.userName,
          phoneNumber: user.phoneNumber,
          role: user.role,
          permission: user.permission
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

function adminLogin(req, res, next) {
  console.log(Number(req.body.phoneNumber));
  User.findOne({ phoneNumber: req.body.phoneNumber })
    .select('_id password phoneNumber userName role permission photo')
    .exec()
    .then((user) => {
      console.log('match phoneNumber', user);
      if (!user) {
        return res.status(500).json({ message: 'phoneNumber or password does not match' });
      }
      if (user.role !== ROLE.MANAGER) {
        return res.status(401).json({ message: 'You are not authorized' });
      }
      return user.authenticate(req.body.password)
      .then(() => {
        const log = new Log({
          userName: user.userName,
          phoneNumber: user.phoneNumber,
          ipAddress: getClientIp(req)
        })
        log.save()
        .then(() => {
          const token = jwt.sign({
            _id: user._id, // eslint-disable-line
            userName: user.userName,
            phoneNumber: user.phoneNumber,
            role: user.role,
            permission: user.permission
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
        .catch(next)
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

  user.save()
  .then((newUser) => {
    console.log(newUser);
    const token = jwt.sign({
      _id: newUser._id, // eslint-disable-line
      userName: newUser.userName,
      phoneNumber: newUser.phoneNumber,
      role: newUser.role,
      permission: newUser.permission
    }, config.jwtSecret, { expiresIn: config.jwtExpires });
    console.log(newUser)
    const data = {
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
    console.log("token", token)
    return res.json({
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
  const min = 1000; const max = 9999
  // let key = Math.floor(Math.random() * (max - min + 1) ) + min;
  const key= 1111
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
          Code.updateOne({phoneNumber: req.body.phoneNumber}, { $set: { "verified" : true } }).exec()  
          .then (() => {
            if (req.body.password) {
              return signup(req,res,next)
            }
          })
          .catch(next)
        } else {
          console.log("old")
          User.findOne({ phoneNumber: +req.body.phoneNumber })    
          .then((user) => {
            console.log(user)
            if (!user || req.body.password) {
              console.log("error")
              return res.status(500).json({ message: 'error!' });
            }
            const token = jwt.sign({
              _id: user._id, // eslint-disable-line
              userName: user.userName,
              phoneNumber: user.phoneNumber,
              role: user.role,
              permission: user.permission
            }, config.jwtSecret, { expiresIn: config.jwtExpires });
            console.log("token", token)
            res.json({
              token,
              info: user,
            })
            
          })
          .catch(next)
        }
        })
       .catch(next)
      .catch(() => {
        res.status(500).json({ message: '验证码出错' });
      });
    })
    .catch(next);
  }

function wechatAuth(req, res, next) {

}

function qqAuth(req, res, next) {

}
module.exports = {
  login,
  signup,
  sendcode,
  checkcode,
  adminLogin,
  wechatAuth,
  qqAuth,
};
