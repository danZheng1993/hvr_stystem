const mongoose = require('mongoose');
const Media = require('../models/media.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const media = new Media(req.body);

  media.save()
  .then((newMedia) => {
    res.json(newMedia);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.media, req.body);

  req.media.save()
  .then((updatedMedia) => {
    res.json(updatedMedia);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.media);
}

function list(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  Media.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.media.remove(() => {
    res.json(req.media);
  })
  .catch(next);
}

function getMediaByID(req, res, next, id) {
  Media.findById(id)
  .then((media) => {
    if (!media) {
      res.status(404).json({ message: 'Media not found' });
      return;
    }

    // if (media.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //   res.status(403).json({ message: 'You are not authorized to access this media' });
    //   return;
    // }

    req.media = media;
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
  getMediaByID,
};
