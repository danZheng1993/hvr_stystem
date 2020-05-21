const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.use(userCtrl.getProfile);

router.route('/me')
  .get(userCtrl.read)
  .patch(userCtrl.saveProfile)
  .post(userCtrl.uploadFile);

router.route('/admin')
  .get(userCtrl.read)
  .patch(userCtrl.saveAdminProfile)
  .post(userCtrl.uploadAdminAvatar);

router.route('/contacts')
  .get(userCtrl.getContacts)
  .patch(userCtrl.addToContacts)

router.route('/collections')
  .patch(userCtrl.addToCollections)
  .delete(userCtrl.removeFromCollections)

router.route('/attentions')
  .patch(userCtrl.addToAttentions)
  .delete(userCtrl.removeFromAttentions)

module.exports = router;
