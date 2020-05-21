const express = require('express');
const serviceCtrl = require('../controllers/service.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(serviceCtrl.list)
  .post(serviceCtrl.create);

router.route('/:serviceId')
  .get(serviceCtrl.read)
  .put(serviceCtrl.update)
  .delete(serviceCtrl.remove);

router.param('serviceId', serviceCtrl.getServiceByID);

module.exports = router;
