const express = require('express');
const subcategoryCtrl = require('../controllers/subcategory.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(subcategoryCtrl.list)
  .post(subcategoryCtrl.create);

router.route('/:subcategoryId')
  .get(subcategoryCtrl.read)
  .put(subcategoryCtrl.update)
  .delete(subcategoryCtrl.remove);

router.param('subcategoryId', subcategoryCtrl.getSubcategoryByID);

module.exports = router;
