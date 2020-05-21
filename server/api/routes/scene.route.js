const express = require('express');
const sceneCtrl = require('../controllers/scene.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(sceneCtrl.list)
  .post(sceneCtrl.create);

router.route('/:sceneId')
  .get(sceneCtrl.read)
  .put(sceneCtrl.update)
  .delete(sceneCtrl.remove);

router.param('sceneId', sceneCtrl.getSceneByID);

module.exports = router;
