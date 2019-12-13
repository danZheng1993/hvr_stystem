const mongoose = require('mongoose');
const Job = require('../models/job.model');
const User = require('../models/user.model');
const Payment = require('../models/payment.model');
const ROLES = require('../constants/role');
const moment = require('moment')

function getDashboardData(req, res, next) {
  const today = moment().startOf('day').toDate();    
  const tomorrow = moment().add(1,'days').startOf('day').toDate(); ; 
  const yesterday = moment().subtract(1,'days').startOf('day').toDate(); ; 
  // const yesterday = new Date()
  const weekago = moment().subtract(7,'days').startOf('day').toDate(); ; 
  Job.count({ created: { $gte:  today, $lt :  tomorrow,} })
  .then((todayJobs) => {
    Payment.aggregate(
      [
        { $match: { created: { $gte:  today, $lt :  tomorrow,} }},
        {
          $group:
            {
              _id:  null ,
              totalAmount: { $sum: "$amount"},
            }
        },
        { $project: { _id: 0, totalAmount: 1 } }
      ]
    )
    .then((todayTransaction) => {
      Payment.aggregate(
        [
          { $match: { created: { $gte:  yesterday, $lt :  today,} }},
          {
            $group:
              {
                _id:  null ,
                totalAmount: { $sum: "$amount"},
              }
          },
          { $project: { _id: 0, totalAmount: 1 } }
        ]
      )
      .then((yesterdayTransaction) => {
        Payment.aggregate(
          [
            { $match: { created: { $gte:  weekago, $lt :  tomorrow,} }},
            {
              $group:
                {
                  _id:  null ,
                  totalAmount: { $sum: "$amount"},
                }
            },
            { $project: { _id: 0, totalAmount: 1 } }
          ]
        )
        .then((weekTransaction) => {
          res.json({
            todayJobs,
            todayTransaction: todayTransaction[0] ? todayTransaction[0].totalAmount : 0, 
            yesterdayTransaction: yesterdayTransaction[0] ? yesterdayTransaction[0].totalAmount : 0, 
            weekTransaction: weekTransaction[0] ? weekTransaction[0].totalAmount : 0, 
          })
        })
        .catch(next)
      })
      .catch(next)
    })
    .catch(next)
  })
  .catch(next)
}

function getJobStatistics(req, res, next) {
  const startDate = moment(req.query.startDate).startOf('day').toDate()
  const endDate = moment(req.query.endDate).endOf('day').toDate()
  Job.aggregate(
    [
      { $match: { created: { $gte: startDate, $lt: endDate} }},
      {
        $group:
          {
            _id:  { $dateToString: { format: "%Y-%m-%d", date: "$created"} },
            date: {$first: {$dayOfYear: "$created"}},
            amount: { $sum: 1},
          }
      },
      { $project: { amount: 1, _id: 1, date: 1}}
    ]
  )
  .sort({date: 1})
  .then((jobsStatistics) => {
    console.log(jobsStatistics)
    res.json(jobsStatistics)
  })
  .catch(next)
}

function getTransactionStatistics(req, res, next) {
  const startDate = moment(req.query.startDate).startOf('day').toDate()
  const endDate = moment(req.query.endDate).endOf('day').toDate()
  Payment.aggregate(
    [
      { $match: { created: { $gte: startDate, $lt: endDate} }},
      {
        $group:
          {
            _id:  { $dateToString: { format: "%Y-%m-%d", date: "$created"} },
            date: {$first: {$dayOfYear: "$created"}},
            amount: { $sum: "$amount"},
          }
      },
      { $project: { amount: 1, _id: 1, date: 1}}
    ]
  )
  .sort({date: 1})
  .then((jobsStatistics) => {
    console.log(jobsStatistics)
    res.json(jobsStatistics)
  })
  .catch(next)
}

function getCreatedUsers(req, res, next) {
  const today = moment().startOf('day').toDate();    
  const tomorrow = moment().add(1,'days').startOf('day').toDate();
  const yesterday = moment().subtract(1,'days').startOf('day').toDate();
  const thismonth = moment().startOf('month').toDate();
  // User.aggregate(
  //   [
  //     { $match: { created: { $gte:  past, $lt :  tomorrow,} }},
  //     {
  //       $group:
  //         {
  //           _id: {
  //             $cond: [
  //               { $lt: [ "$created", yesterday ] },
  //               "this month",
  //               { $cond: [
  //                   { $lt: [ "$created", today ] },
  //                   "yesterday",
  //                   "today"
  //               ]}
  //             ]
  //         },
  //           sum: { $sum: 1},
  //         }
  //     },
  //   ]
  // )
  // .then((todayUsers) => {
  //   console.log(todayUsers)
  // })
  // .catch(next)
  User.count({created: { $gte: today, $lt: tomorrow}, role: 'provider'})
  .then((todayProvider) => {
    User.count({created: { $gte: yesterday, $lt: today}, role: 'provider'})
    .then((yesterdayProvider) => {
      User.count({created: { $gte: thismonth, $lt: tomorrow}, role: 'provider'})
      .then((thismonthProvider) => {
        User.count({created: { $gte: today, $lt: tomorrow}, role: 'client'})
        .then((todayClient) => {
          User.count({created: { $gte: yesterday, $lt: today}, role: 'client'})
          .then((yesterdayClient) => {
            User.count({created: { $gte: thismonth, $lt: tomorrow}, role: 'client'})
            .then((thismonthClient) => {
              res.json({todayProvider, yesterdayProvider, thismonthProvider, todayClient, yesterdayClient, thismonthClient})
            })
            .catch(next)
          })
          .catch(next)
        })
        .catch(next)
      })
      .catch(next)
    })
    .catch(next)
  })
  .catch(next)
}

module.exports = {
  getDashboardData,
  getCreatedUsers,
  getJobStatistics,
  getTransactionStatistics
};
