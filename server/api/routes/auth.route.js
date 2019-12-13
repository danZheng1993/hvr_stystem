const express = require('express');
const authCtrl = require('../controllers/auth.controller');
const router = express.Router();

router.route('/login')
  .post(authCtrl.login);

router.route('/admin/login')
  .post(authCtrl.adminLogin);

router.route('/signup')
  .post(authCtrl.signup);

router.route('/sendcode')
  .post(authCtrl.sendcode);

router.route('/checkcode')
  .post(authCtrl.checkcode);

router.route('/')
module.exports = router;
