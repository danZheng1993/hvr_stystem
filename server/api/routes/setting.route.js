const express = require('express');
const settingCtrl = require('../controllers/setting.controller');
const router = express.Router();

router.route('/')
  .get(settingCtrl.read)
  .post(settingCtrl.update);

  router.route('/splash/')
  .post(settingCtrl.upload);
  
module.exports = router;
