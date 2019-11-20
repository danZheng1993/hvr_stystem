const mongoose = require('mongoose');
const Banner = require('../models/banner.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const banner = new Banner(req.body);

  banner.save()
  .then((newBanner) => {
    res.json(newBanner);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.banner, req.body);

  req.banner.save()
  .then((updatedBanner) => {
    res.json(updatedBanner);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.banner);
}

function list(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  Banner.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.banner.remove(() => {
    res.json(req.banner);
  })
  .catch(next);
}

function getBannerByID(req, res, next, id) {
  Banner.findById(id)
  .then((banner) => {
    if (!banner) {
      res.status(404).json({ message: 'Banner not found' });
      return;
    }

    if (banner.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
      res.status(403).json({ message: 'You are not authorized to access this banner' });
      return;
    }

    req.banner = banner;
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
  getBannerByID,
};
