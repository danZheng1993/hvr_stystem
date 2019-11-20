const express = require('express');
const newsCtrl = require('../controllers/news.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(newsCtrl.list)
  .post(newsCtrl.create);

router.route('/:newsId')
  .get(newsCtrl.read)
  .put(newsCtrl.update)
  .delete(newsCtrl.remove);

router.param('newsId', newsCtrl.getNewsByID);

module.exports = router;
