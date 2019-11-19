const express = require('express');
const chatCtrl = require('../controllers/chat.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(chatCtrl.getArchivedMessages)


module.exports = router;
