const mongoose = require('mongoose');
const Setting = require('../models/setting.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const setting = new Setting(req.body);

  setting.save()
  .then((newSetting) => {
    res.json(newSetting);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.setting, req.body);

  req.setting.save()
  .then((updatedSetting) => {
    res.json(updatedSetting);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.setting);
}

function list(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  Setting.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.setting.remove(() => {
    res.json(req.setting);
  })
  .catch(next);
}

function getSettingByID(req, res, next, id) {
  Setting.findById(id)
  .then((setting) => {
    if (!setting) {
      res.status(404).json({ message: 'Setting not found' });
      return;
    }

    // if (setting.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //   res.status(403).json({ message: 'You are not authorized to access this setting' });
    //   return;
    // }

    req.setting = setting;
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
  getSettingByID,
};
