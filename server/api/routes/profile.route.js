const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.use(userCtrl.getProfile);

router.route('/me')
  .get(userCtrl.read)
  .patch(userCtrl.updateOne)
  .post(userCtrl.uploadFile);
router.route('/contacts')
  .get(userCtrl.getContacts)
  .patch(userCtrl.addToContacts)
module.exports = router;
