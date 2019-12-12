const express = require('express');
const statisticCtrl = require('../controllers/statistic.controller');
const router = express.Router();

router.route('/dashboard/')
  .get(statisticCtrl.getDashboardData)
router.route('/users/')
  .get(statisticCtrl.getCreatedUsers)

module.exports = router;
