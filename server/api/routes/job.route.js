const express = require('express');
const jobCtrl = require('../controllers/job.controller');
const ROLES = require('../constants/role');
const policies = require('../policies');

const router = express.Router();
// router.use(policies.checkRoles([ROLES.CLIENT, ROLES.PROVIDER, ROLES.ADMIN]));

router.route('/')
  .get(jobCtrl.list)
  .post(jobCtrl.create);
  
router.route('/search/')
  .post(jobCtrl.search);

router.route('/apply/:jobId')
  .put(jobCtrl.apply);

router.route('/hire/:jobId')
  .put(jobCtrl.hire);

  router.route('/updateStatus/:jobId')
  .put(jobCtrl.updateStatus);

router.route('/:jobId')
  .get(jobCtrl.read)
  .put(jobCtrl.update)
  .delete(jobCtrl.remove);

router.param('jobId', jobCtrl.getJobByID);

module.exports = router;