const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../models/user.model');
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
  console.log("aaaa")
  console.log(req.body)
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

module.exports = {
  login,
  signup,
};
