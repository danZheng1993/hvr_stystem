const express = require('express');
const orderCtrl = require('../controllers/order.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.MANAGER]));

router.route('/')
  .get(orderCtrl.list)
  .post(orderCtrl.create);

router.route('/:orderId')
  .get(orderCtrl.read)
  .put(orderCtrl.update)
  .delete(orderCtrl.remove);

module.exports = router;
