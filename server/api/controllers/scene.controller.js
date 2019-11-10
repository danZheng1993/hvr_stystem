const mongoose = require('mongoose');
const Scene = require('../models/scene.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const scene = new Scene(req.body);

  scene.save()
  .then((newScene) => {
    res.json(newScene);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.scene, req.body);

  req.scene.save()
  .then((updatedScene) => {
    res.json(updatedScene);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.scene);
}

function list(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  Scene.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.scene.remove(() => {
    res.json(req.scene);
  })
  .catch(next);
}

function getSceneByID(req, res, next, id) {
  Scene.findById(id)
  .then((scene) => {
    if (!scene) {
      res.status(404).json({ message: 'Scene not found' });
      return;
    }

    // if (scene.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //   res.status(403).json({ message: 'You are not authorized to access this scene' });
    //   return;
    // }

    req.scene = scene;
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
  getSceneByID,
};
