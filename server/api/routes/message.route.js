const express = require('express');
const messageCtrl = require('../controllers/message.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(messageCtrl.list)
  .post(messageCtrl.create);

router.route('/:messageId')
  .get(messageCtrl.read)
  .delete(messageCtrl.remove);

router.param('awardId', messageCtrl.getMessageById);

module.exports = router;
