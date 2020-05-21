const express = require('express');
const bannerCtrl = require('../controllers/banner.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(bannerCtrl.list)
  .post(bannerCtrl.create);

router.route('/upload')
  .post(bannerCtrl.upload);

router.route('/:bannerId')
  .get(bannerCtrl.read)
  .put(bannerCtrl.update)
  .delete(bannerCtrl.remove);

router.param('bannerId', bannerCtrl.getBannerByID);

module.exports = router;
