const express = require('express');
const statisticCtrl = require('../controllers/statistic.controller');
const router = express.Router();

router.route('/dashboard/')
  .get(statisticCtrl.getDashboardData)
router.route('/users/')
  .get(statisticCtrl.getCreatedUsers)
router.route('/jobs/')
  .get(statisticCtrl.getJobStatistics)
router.route('/transaction/')
  .get(statisticCtrl.getTransactionStatistics)

module.exports = router;
