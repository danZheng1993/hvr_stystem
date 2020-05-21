const express = require('express');
const paymentCtrl = require('../controllers/payment.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(paymentCtrl.list)

router.route('/payUpfront')
  .post(paymentCtrl.payUpfront)

  router.route('/finalPay')
  .post(paymentCtrl.finalPay)

router.route('/:paymentId')
  .get(paymentCtrl.read)

router.param('paymentId', paymentCtrl.getPaymentByID);

module.exports = router;
