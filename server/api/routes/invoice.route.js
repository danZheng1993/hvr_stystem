const express = require('express');
const invoiceCtrl = require('../controllers/invoice.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(invoiceCtrl.list)
  .post(invoiceCtrl.create);

router.route('/me/')
  .get(invoiceCtrl.getMyInvoice)

router.route('/:invoiceId')
  .get(invoiceCtrl.read)
  .put(invoiceCtrl.update)
  .delete(invoiceCtrl.remove);

router.param('invoiceId', invoiceCtrl.getInvoiceByID);

module.exports = router;
