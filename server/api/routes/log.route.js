const express = require('express');
const logCtrl = require('../controllers/log.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(logCtrl.list)

router.route('/:logId')
  .delete(logCtrl.remove);

router.param('logId', logCtrl.getLogByID);

module.exports = router;
