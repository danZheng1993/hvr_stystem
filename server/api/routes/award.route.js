const express = require('express');
const awardCtrl = require('../controllers/award.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(awardCtrl.list)
  .post(awardCtrl.create);

router.route('/upload')
  .post(awardCtrl.upload);

router.route('/:awardId')
  .get(awardCtrl.read)
  .put(awardCtrl.update)
  .delete(awardCtrl.remove);

router.param('awardId', awardCtrl.getAwardByID);

module.exports = router;
