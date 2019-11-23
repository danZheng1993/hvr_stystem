const express = require('express');
const mediaCtrl = require('../controllers/media.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(mediaCtrl.list)
  .post(mediaCtrl.create);

router.route('/search/')
  .post(mediaCtrl.search);

router.route('/:mediaId')
  .get(mediaCtrl.read)
  .put(mediaCtrl.update)
  .delete(mediaCtrl.remove);

router.param('mediaId', mediaCtrl.getMediaByID);

module.exports = router;
