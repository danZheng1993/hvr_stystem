const express = require('express');
const settingCtrl = require('../controllers/setting.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(settingCtrl.list)
  .post(settingCtrl.create);

router.route('/:settingId')
  .get(settingCtrl.read)
  .put(settingCtrl.update)
  .delete(settingCtrl.remove);

router.param('settingId', settingCtrl.getSettingByID);

module.exports = router;
