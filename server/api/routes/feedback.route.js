const express = require('express');
const feedbackCtrl = require('../controllers/feedback.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(feedbackCtrl.list)
  .post(feedbackCtrl.create);

router.route('/:feedbackId')
  .get(feedbackCtrl.read)
  .put(feedbackCtrl.update)
  .delete(feedbackCtrl.remove);

router.param('feedbackId', feedbackCtrl.getFeedbackByID);

module.exports = router;
