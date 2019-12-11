const mongoose = require('mongoose');
const Setting = require('../models/setting.model');
const ROLES = require('../constants/role');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path')
var _ = require('lodash')
function update(req, res, next) {
  if (req.user.role !== ROLES.MANAGER) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  Setting.findOneAndUpdate({}, {$set: {..._.omit(req.body, '_id')}}, { returnOriginal: false },).exec()
  .then((updatedSetting) => {
    console.log(updatedSetting)
    res.json(updatedSetting);
  })
  .catch(next);
}

function read(req, res, next) {
  Setting.findOne({})
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function upload(req, res, next) {
  console.log("uploadFile")
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (!files) {
      res.status(500).json({ message: 'invalid request' });
      return;
    }
    var oldpath = files.image.path;
    var directory = process.cwd() + '\\public\\'
    fs.readFile(oldpath, function (err, data) {
      if (err) throw err;
      
      // Write the file
      fs.writeFile(directory + 'background.png', data, function (err) {
          if (err) throw err;
          res.end();
          console.log('File written!');
      });
      
      // Delete the file
      fs.unlink(oldpath, function (err) {
          if (err) throw err;
      });
    });
 });
}

module.exports = {
  update,
  read,
  upload
};
