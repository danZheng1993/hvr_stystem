const express = require('express');
const passport = require('passport');
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

router.route('/test_deeplinking')
  .get(function (req, res) {
    res.redirect('hvr://test/return?token=1');
  })

router.route('/auth/qq')
  .get(
    passport.authenticate('qq'),
    function(req, res){
      // The request will be redirected to qq for authentication, so this
      // function will not be called.
    }
  );

router.route('/auth/qq/callback')
  .get(
    passport.authenticate('qq', { failureRedirect: 'hvr://auth/failure' }),
    authCtrl.qqAuth,
  )

router.route('/auth/wechat')
  .get(passport.authenticate('wechat'));

router.route('/auth/wechat/callback')
  .get(passport.authenticate('wechat', {
    failureRedirect: 'hvr://auth/failure',
  }), authCtrl.wechatAuth);

module.exports = router;
