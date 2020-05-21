const express = require('express');
const typeCtrl = require('../controllers/type.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(typeCtrl.list)
  .post(typeCtrl.create);

router.route('/:typeId')
  .get(typeCtrl.read)
  .put(typeCtrl.update)
  .delete(typeCtrl.remove);

router.param('typeId', typeCtrl.getTypeByID);

module.exports = router;
