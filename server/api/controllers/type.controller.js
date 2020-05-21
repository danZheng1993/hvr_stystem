const mongoose = require('mongoose');
const Type = require('../models/type.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const type = new Type(req.body);

  type.save()
  .then((newType) => {
    res.json(newType);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.type, req.body);

  req.type.save()
  .then((updatedType) => {
    res.json(updatedType);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.type);
}

function list(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  Type.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.type.remove(() => {
    res.json(req.type);
  })
  .catch(next);
}

function getTypeByID(req, res, next, id) {
  Type.findById(id)
  .then((type) => {
    if (!type) {
      res.status(404).json({ message: 'Type not found' });
      return;
    }

    if (type.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
      res.status(403).json({ message: 'You are not authorized to access this type' });
      return;
    }

    req.type = type;
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
  getTypeByID,
};
