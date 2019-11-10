const mongoose = require('mongoose');
const Subcategory = require('../models/subcategory.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const subcategory = new Subcategory(req.body);

  subcategory.save()
  .then((newSubcategory) => {
    res.json(newSubcategory);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.subcategory, req.body);

  req.subcategory.save()
  .then((updatedSubcategory) => {
    res.json(updatedSubcategory);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.subcategory);
}

function list(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  Subcategory.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.subcategory.remove(() => {
    res.json(req.subcategory);
  })
  .catch(next);
}

function getSubcategoryByID(req, res, next, id) {
  Subcategory.findById(id)
  .then((subcategory) => {
    if (!subcategory) {
      res.status(404).json({ message: 'Subcategory not found' });
      return;
    }

    // if (subcategory.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //   res.status(403).json({ message: 'You are not authorized to access this subcategory' });
    //   return;
    // }

    req.subcategory = subcategory;
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
  getSubcategoryByID,
};
