const express = require('express');
const contractCtrl = require('../controllers/contract.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(contractCtrl.list)

router.route('/:contractId')
  .get(contractCtrl.read);

router.param('contractId', contractCtrl.getContractByID);

module.exports = router;
