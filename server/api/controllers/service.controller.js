const mongoose = require('mongoose');
const Service = require('../models/service.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const service = new Service(req.body);

  service.save()
  .then((newService) => {
    res.json(newService);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.service, req.body);

  req.service.save()
  .then((updatedService) => {
    res.json(updatedService);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.service);
}

function list(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  Service.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.service.remove(() => {
    res.json(req.service);
  })
  .catch(next);
}

function getServiceByID(req, res, next, id) {
  Service.findById(id)
  .then((service) => {
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    if (service.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
      res.status(403).json({ message: 'You are not authorized to access this service' });
      return;
    }

    req.service = service;
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
  getServiceByID,
};
