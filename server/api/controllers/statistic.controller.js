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

function compareJobs(req, res, next) {
  const thisweek = [moment().startOf('week').toDate(), moment().endOf('day').toDate()]
  const lastweek = [moment().subtract(7, 'days').startOf('week').toDate(), moment().subtract(7, 'days').endOf('day').toDate()]
  const thismonth = [moment().startOf('month').toDate(), moment().toDate()]
  const lastmonth = [moment().subtract(1, 'months').startOf('month').toDate(), moment().subtract(1, 'months').endOf('day').toDate()]
  Job.aggregate(
    [
      { $match: { created: { $gte: thisweek[0], $lt: thisweek[1]} }},
      { $group: {  _id:  null, amount: { $sum: 1} } },
    ]
  )
  .then((thisweekAmount) => {
    Job.aggregate(
      [
        { $match: { created: { $gte: lastweek[0], $lt: lastweek[1]} }},
        { $group: {  _id:  null, amount: { $sum: 1} } },
      ]
    )
    .then((lastweekAmount) => {
      Job.aggregate(
        [
          { $match: { created: { $gte: thismonth[0], $lt: thismonth[1]} }},
          { $group: {  _id:  null, amount: { $sum: 1} } },
        ]
      )
      .then((thismonthAmount) => {
        Job.aggregate(
          [
            { $match: { created: { $gte: lastmonth[0], $lt: lastmonth[1]} }},
            { $group: {  _id:  null, amount: { $sum: 1} } },
          ]
        )
        .then((lastmonthAmount) => {
          console.log(thisweekAmount, lastweekAmount, thismonthAmount, lastmonthAmount)
          const compare = {
            thisweekAmount: thisweekAmount[0] ? thisweekAmount[0].amount : 0,
            lastweekAmount: lastweekAmount[0] ? lastweekAmount[0].amount : 0,
            thismonthAmount: thismonthAmount[0] ? thismonthAmount[0].amount : 0,
            lastmonthAmount: lastmonthAmount[0] ? lastmonthAmount[0].amount : 0
          }
          console.log(compare)
          res.json(compare)
        })
        .catch(next)
      })
      .catch(next)
    })
    .catch(next)
  })
  .catch(next)
}

function compareTransactions(req, res, next) {
  const thisweek = [moment().startOf('week').toDate(), moment().endOf('day').toDate()]
  const lastweek = [moment().subtract(7, 'days').startOf('week').toDate(), moment().subtract(7, 'days').endOf('day').toDate()]
  const thismonth = [moment().startOf('month').toDate(), moment().toDate()]
  const lastmonth = [moment().subtract(1, 'months').startOf('month').toDate(), moment().subtract(1, 'months').endOf('day').toDate()]
  Payment.aggregate(
    [
      { $match: { created: { $gte: thisweek[0], $lt: thisweek[1]} }},
      { $group: {  _id:  null, amount: { $sum: "$amount"} } },
    ]
  )
  .then((thisweekAmount) => {
    Payment.aggregate(
      [
        { $match: { created: { $gte: lastweek[0], $lt: lastweek[1]} }},
        { $group: {  _id:  null, amount: { $sum: "$amount"} } },
      ]
    )
    .then((lastweekAmount) => {
      Payment.aggregate(
        [
          { $match: { created: { $gte: thismonth[0], $lt: thismonth[1]} }},
          { $group: {  _id:  null, amount: { $sum: "$amount"} } },
        ]
      )
      .then((thismonthAmount) => {
        Payment.aggregate(
          [
            { $match: { created: { $gte: lastmonth[0], $lt: lastmonth[1]} }},
            { $group: {  _id:  null, amount: { $sum: "$amount"} } },
          ]
        )
        .then((lastmonthAmount) => {
          console.log(thisweekAmount, lastweekAmount, thismonthAmount, lastmonthAmount)
          const compare = {
            thisweekAmount: thisweekAmount[0] ? thisweekAmount[0].amount.toFixed(2) : 0,
            lastweekAmount: lastweekAmount[0] ? lastweekAmount[0].amount.toFixed(2) : 0,
            thismonthAmount: thismonthAmount[0] ? thismonthAmount[0].amount.toFixed(2) : 0,
            lastmonthAmount: lastmonthAmount[0] ? lastmonthAmount[0].amount.toFixed(2) : 0
          }
          console.log(compare)
          res.json(compare)
        })
        .catch(next)
      })
      .catch(next)
    })
    .catch(next)
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
            count: { $sum: 1},
          }
      },
      { $project: { amount: 1, _id: 1, date: 1, count: 1}}
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
  compareJobs,
  compareTransactions,
  getTransactionStatistics
};
