const mongoose = require('mongoose');
const Feedback = require('../models/feedback.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const feedback = new Feedback(req.body);

  feedback.save()
  .then((newFeedback) => {
    res.json(newFeedback);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.feedback, req.body);

  req.feedback.save()
  .then((updatedFeedback) => {
    res.json(updatedFeedback);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.feedback);
}

function list(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  Feedback.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.feedback.remove(() => {
    res.json(req.feedback);
  })
  .catch(next);
}

function getFeedbackByID(req, res, next, id) {
  Feedback.findById(id)
  .then((feedback) => {
    if (!feedback) {
      res.status(404).json({ message: 'Feedback not found' });
      return;
    }

    if (feedback.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
      res.status(403).json({ message: 'You are not authorized to access this feedback' });
      return;
    }

    req.feedback = feedback;
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
  getFeedbackByID,
};
