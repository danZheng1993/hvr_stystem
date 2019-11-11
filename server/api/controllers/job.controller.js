const mongoose = require('mongoose');
const Job = require('../models/job.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const job = new Job(req.body);
 // job.user = req.user._id;

  job.save()
  .then((newJob) => {
    res.json(newJob);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.job, req.body);

  req.job.save()
  .then((updatedJob) => {
    res.json(updatedJob);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.job);
}

function list(req, res, next) {
  const limit = req.query.limit * 1;
  let where = {};

  Job.find(where)
  .sort({ date: -1 })
  .limit(limit)
  .populate('user')
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.job.remove(() => {
    res.json(req.job);
  })
  .catch(next);
}

function weeklyReport(req, res) {
  let where = {};
  if (req.user.role === ROLES.USER) {
    where = { user: new mongoose.Types.ObjectId(req.user._id) };
  }

  Job.aggregate([
    {
      $match: where,
    },
    {
      $group: {
        _id: { year: { $year: '$date' }, week: { $week: '$date' } },
        totalDistance: { $sum: '$distance' },
        totalDuration: { $sum: '$duration' },
        count: { $sum: 1 },
      },
    },
  ]).exec((err, reports) => {
    if (err) {
      return res.status(422).send({
        message: err.message,
      });
    }

    return res.json(reports);
  });
}

function getJobByID(req, res, next, id) {
  Job.findById(id)
  .then((job) => {
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }

    // if (job.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //   res.status(403).json({ message: 'You are not authorized to access this job' });
    //   return;
    // }

    req.job = job;
    next();
  })
  .catch(next);
}

module.exports = {
  create,
  update,
  read,
  list,
  remove,
  weeklyReport,
  getJobByID,
};
