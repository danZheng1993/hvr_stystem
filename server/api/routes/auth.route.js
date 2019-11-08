const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router();

router.route('/login')
  .post(authCtrl.login);

router.route('/signup')
  .post(authCtrl.signup);

router.route('/sendcode')
  .post(authCtrl.signup);

router.route('/checkcode')
  .post(authCtrl.signup);

router.route('/')
module.exports = router;
