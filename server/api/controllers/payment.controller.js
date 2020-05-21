const mongoose = require('mongoose');
const Payment = require('../models/payment.model');
const Setting = require('../models/setting.model');
const Job = require('../models/job.model');
const User = require('../models/user.model');
const ROLES = require('../constants/role');
const STATUS = require('../constants/status');
const xmpp = require('simple-xmpp')

function payUpfront(req, res, next) {
  console.log("upfront", req.body.id)
  if (!req.body.id || !req.user) {
    res.status(500).json({ message: 'Invalid request' });
    return
  }
  Job.findOne({_id: req.body.id, status: STATUS.NOT_PAID, creator: req.user._id})
  .then((job) => {
    if (!job) {
      res.status(500).json({ message: 'Jobs not found' });
      return;
    }
    if (job.creator != req.user._id) {
      res.status(500).json({ message: 'Fake request!' });
      return;
    }
    Setting.findOne()
    .then((setting) => {
      // payment API
      // Notification
      const amount = job.price * (setting.upfrontRate) / 100
      const payment = new Payment({
        from: req.user._id,
        to: job.hired,
        amount: amount,
        type: STATUS.UPFRONT,
        content: job._id
      });
      let updatedJob = new Job(
        Object.assign(job, {
          upfront: amount,
          upfrontDate: new Date(),
          status: STATUS.WAITING,
        })
      )
      console.log(updatedJob)
      updatedJob.save()
      .then((newJob) => {
        payment.save()
        .then((newPayment) => {
          User.updateOne({_id: newJob.hired}, { $inc: {balance: amount} }).exec()
          .then((newuser) => {
            xmpp.send(`${updatedJob.hired}@desktop-jgen8l2/spark`, `${req.user.userName} paid ${updatedJob.upfront}`, false);
            res.json(newJob);
          })
          .catch(next);
        })
        .catch(next);
      })
      .catch(next)
    })
    .catch(next)
  })
  .catch(next)

}

function finalPay(req, res, next) {
  console.log('finalPay', req.body)
  if (!req.body.id || !req.user) {
    res.status(500).json({ message: 'Invalid request' });
    return
  }
  Job.findOne({_id: req.body.id, status: STATUS.TESTING, creator: req.user._id})
  .then((job) => {
    if (!job) {
      res.status(500).json({ message: 'Jobs not found' });
      return;
    }
    if (job.creator != req.user._id) {
      res.status(500).json({ message: 'Fake request!' });
      return;
    }
    Setting.findOne()
    .then((setting) => {
      
      // payment API
      // Notification
      const amount = job.price * (100 - (setting.upfrontRate)) / 100
      const payment = new Payment({
        from: req.user._id,
        to: job.hired,
        amount: amount,
        type: STATUS.FINAL_PAY,
        content: job._id
      });
      let updatedJob = new Job(
        Object.assign(job, {
          upfront: amount + job.upfront,
          finalPayDate: new Date(),
          status: STATUS.GIVING_FEEDBACK,
        })
      )
      console.log(updatedJob)
      updatedJob.save()
      .then((newJob) => {
        payment.save()
        .then((newPayment) => {
          User.updateOne({_id: newJob.hired}, { $inc: {balance: amount} }).exec()
          .then((newuser) => {
            xmpp.send(`${updatedJob.hired}@desktop-jgen8l2/spark`, `${req.user.userName} paid ${job.upfront}`, false);
            res.json(newJob);
          })
          .catch(next);

        })
        .catch(next);
      })
      .catch(next)
    })
    .catch(next)
  })
  .catch(next)

}

function read(req, res) {
  res.json(req.payment);
}

function list(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  Payment.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function getPaymentByID(req, res, next, id) {
  Payment.findById(id)
  .then((payment) => {
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }

    // if (payment.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //   res.status(403).json({ message: 'You are not authorized to access this payment' });
    //   return;
    // }

    req.payment = payment;
    next();
  })
  .catch(next);
}

module.exports = {
  read,
  list,
  payUpfront,
  getPaymentByID,
  finalPay
};
