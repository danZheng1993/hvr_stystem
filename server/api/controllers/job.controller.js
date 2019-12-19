const mongoose = require('mongoose');
const Job = require('../models/job.model');
const Invoice = require('../models/invoice.model');
const ROLES = require('../constants/role');
const STATUS = require('../constants/status')
const xmpp = require('simple-xmpp')
const _ = require('lodash')
function create(req, res, next) {
  const job = new Job({...req.body, creator: req.user._id});
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

function apply(req, res, next) {
  console.log("applied!")
  // Object.assign(req.job, req.body);
  if (isNaN(+req.body.price) || (_.findIndex(req.job.applicants, {applicant: req.user._id}) !== -1)) {
    res.status(500).json({ message: 'Invalid request' });
    return;
  }
  // if (req.body.price )
  if (req.body.price) {
    req.job.applicants.push({applicant: req.user._id, price: req.body.price})
  }
  req.job.save()
  .then((updatedJob) => {
    xmpp.send(`${updatedJob.creator}@desktop-jgen8l2/spark`, `${req.user.userName} applied to your job at price ${req.body.price}`, false);
    res.json(updatedJob);
  })
  .catch(next);
}


function getMyJob(req, res, next) {
  console.log("getMyJob", req.user)
  let where = { flag: true}
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }
  if (!req.user.role) {      
    res.status(500).json({ message: 'Invalid request' });
    return;
  }
  if (req.user.role == 'client') {
    where = {
      ...where,
      creator: req.user._id
    }
  } else if (req.user.role == 'provider') {
    where = {
      ...where,
      $or: [
        {applicants: {$elemMatch: { applicant: String(req.user._id)}}},
        {hired: req.user._id},
      ]
    }
  }
  Job.find(where)
  .sort({created: -1})
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function hire(req, res, next) {
  console.log("hire!!!")
  console.log(req.user, req.body)
  Object.assign(req.job, {...req.body, status: STATUS.NOT_PAID});
  console.log(req.body)
  req.job.save()
  .then((updatedJob) => {
    xmpp.send(`${req.body.hired}@desktop-jgen8l2/spark`, 'congratulations! you were hired ', false);
    res.json(updatedJob);
  })
  .catch(next);
}

function cancel(req, res, next) {
  console.log("cancel job")
  Object.assign(req.job, {flag: false});
  console.log(req.body)
  req.job.save()
  .then((updatedJob) => {
    // xmpp.send(`${req.body.hired}@desktop-jgen8l2/spark`, 'congratulations! you were hired ', false);
    res.json(updatedJob);
  })
  .catch(next);
}

function giveFeedback(req, res, next) {
  console.log("giveFeedback?", req.body)
  if (!req.body) {4
    res.status(500).json({ message: 'Invalid Request' });
    return;
  }
  Object.assign(req.job, {...req.body, status: STATUS.FINISHED});
  console.log(req.body)
  req.job.save()
  .then((updatedJob) => {
    let invoice = new Invoice({
      sender: req.user._id,
      receiver: updatedJob.hired,
      jobID: updatedJob._id,
      price: updatedJob.price,
    })
    invoice.save()
    .then((newInvoice) => {
      xmpp.send(`${updatedJob.hired}@desktop-jgen8l2/spark`, `${req.user.userName} finished the job`, false);
      res.json(updatedJob);
    })
    .catch(next)
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.job);
}

function list(req, res, next) {
  console.log("JobsList", req.query)
  let where = {flag: true};
  if (req.user.role !== ROLES.MANAGER) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  let page_size = +req.query.page_size || 10
  let page = +req.query.page || 1
  if (req.query.filter) {
    let filter = JSON.parse(req.query.filter)
    filter.status &&(where['status'] = filter.status)
    filter.hired &&(where['hired'] = filter.hired)
    filter.creator &&(where['creator'] = filter.creator)
    filter.query && (where['_id'] = filter.query)
  }
  console.log(where)
  Job.count(where)
  .then ((count) => {
    Job.find(where)
    .limit(page_size)
    .skip(page_size * (page-1))
    .sort({created: -1})
    .populate('creator', 'phoneNumber')
    .populate('hired', 'phoneNumber')
    .then((jobs) => {
      res.json({jobs, count});
    })
    .catch(next);
  })
  .catch(next)
}

function remove(req, res, next) {
  Object.assign(req.job, {flag: false});

  req.job.save()
  .then((updatedJob) => {
    res.json(updatedJob);
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
  console.log("getbyID",req.body, id)
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
    console.log(job)
    req.job = job;
    next();
  })
  .catch(next);
}

function search(req, res, next) {
  console.log("searchJob",req.body)
  let where = { flag: true, status: '竞标中' ,  applicants: {$not: {$elemMatch: {applicant: String(req.user._id)  }}}}
  where = {...where, ...req.body}
  console.log(where)
  Job.find(where)
  .sort({ created: -1 })
//  .limit(limit)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function getFeedback(req, res, next) {
  console.log("getFeedback",req.body)
  let where = {}
  if (!req.body.hired) {
    res.status(500).json({message: 'Invalid request'})
  }
  where = { hired: new mongoose.Types.ObjectId(req.body.hired), status: STATUS.FINISHED };
  console.log(where)
  Job.find(where)
  .sort({ created: -1 })
  .select(' creator feedback created')
//  .limit(limit)
  .populate('creator', 'userName photo')
  .then((entries) => {
    console.log(entries)
    res.json(entries);
  })
  .catch(next);
}

module.exports = {
  create,
  update,
  read,
  list,
  apply,
  remove,
  search,
  getFeedback,
  hire,
  cancel,
  giveFeedback,
  weeklyReport,
  getJobByID,
  getMyJob
};
