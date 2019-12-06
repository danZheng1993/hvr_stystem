const mongoose = require('mongoose');
const Log = require('../models/log.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const log = new Log(req.body);

  log.save()
  .then((newLog) => {
    res.json(newLog);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.log, req.body);

  req.log.save()
  .then((updatedLog) => {
    res.json(updatedLog);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.log);
}

function list(req, res, next) {
  let where = {};
  console.log("logList", req.body, req.query)
  let page_size = +req.query.page_size || 10
  let page = +req.query.page || 1
  if (req.user.role === ROLES.MANAGER) {
    where = { role: { $ne: ROLES.ADMIN } };
  }
  Log.count({})
  .then ((count) => {
    Log.find(where)
    .limit(page_size)
    .skip(page_size * (page-1))
    .then((logs) => {
      res.json({logs, count});
    })
    .catch(next);
  })
  .catch(next)
}

function remove(req, res, next) {
  req.log.remove(() => {
    res.json(req.log);
  })
  .catch(next);
}

function getLogByID(req, res, next, id) {
  Log.findById(id)
  .then((log) => {
    if (!log) {
      res.status(404).json({ message: 'Log not found' });
      return;
    }

    // if (log.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //   res.status(403).json({ message: 'You are not authorized to access this log' });
    //   return;
    // }

    req.log = log;
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
  getLogByID,
};
