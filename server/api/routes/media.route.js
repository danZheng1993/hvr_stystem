const express = require('express');
const mediaCtrl = require('../controllers/media.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.MANAGER]));

router.route('/')
  .get(mediaCtrl.list)
  .post(mediaCtrl.create);

router.route('/me')
  .get(mediaCtrl.getMyMedias)

router.route('/search/')
  .post(mediaCtrl.search);

router.route('/uploadlink/')
  .post(mediaCtrl.uploadLink);

router.route('/:mediaId')
  .get(mediaCtrl.read)
  .put(mediaCtrl.update)
  .post(mediaCtrl.increaseVisits)
  .delete(mediaCtrl.remove);

router.route('/trash/:mediaId')
  .delete(mediaCtrl.trash);

router.param('mediaId', mediaCtrl.getMediaByID);

module.exports = router;
