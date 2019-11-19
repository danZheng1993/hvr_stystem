const User = require('../models/user.model');
const ROLES = require('../constants/role');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path')
function create(req, res, next) {
  const user = new User({
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    role: req.body.role
  });

  if (req.user.role === ROLES.ADMIN && req.body.role) {
    user.role = req.body.role;
  }

  user.save()
  .then((newUser) => {
    res.json(newUser);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.userModel, {
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
  });

  if (req.body.password) {
    req.userModel.password = req.body.password;
  }

  if (req.user.role === ROLES.ADMIN && req.body.role) {
    req.userModel.role = req.body.role;
  }

  req.userModel.save()
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch(next);
}
function uploadFile(req, res, next) {
  console.log("uploadFile")
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (!files || !fields.type) return;

    console.log(fields)
    var oldpath = files.photo.path;
    var directory = process.cwd() + '\\public\\'
    var fileName = req.user._id + '_' + fields.type + path.extname(files.photo.name);
    fs.readFile(oldpath, function (err, data) {
      if (err) throw err;
      
      // Write the file
      fs.writeFile(directory + fileName, data, function (err) {
          if (err) throw err;
          res.end();
          console.log('File written!');
      });
      
      // Delete the file
      fs.unlink(oldpath, function (err) {
          if (err) throw err;
      });
      
    });
    if (fields.type == 'photo') {
      console.log("update Photo...")
      User.updateOne({_id: req.user._id}, { $set: {photo: fileName }}).exec()
      .then((newuser) => {
        res.json(newuser);
      })
      .catch(next);
    } else if (fields.type == 'frontID') {
      console.log("update frontID...")
      User.updateOne({_id: req.user._id}, { $set: {frontID: fileName }}).exec()
      .then((newuser) => {
        res.json(newuser);
      })
      .catch(next);
    } else if (fields.type == 'backID') {
      console.log("update backID...")
      User.updateOne({_id: req.user._id}, { $set: {backID: fileName }}).exec()
      .then((newuser) => {
        res.json(newuser);
      })
      .catch(next);
    } else if (fields.type == 'companyLicense') {
      console.log("update companyLicense...")
      User.updateOne({_id: fields.id}, { $set: {companyLicense: fileName }}).exec()
      .then((newuser) => {
        res.json(newuser);
      })
      .catch(next);
    }   
 });
}

function updateOne(req, res, next) {
  console.log("profileUpdate")
  console.log(req.body)

  if (req.body.password) {
    req.userModel.password = req.body.password;
  }
  if (req.body.userName) {
    req.userModel.userName = req.body.userName;
  }
  if (req.body.overview) {
    req.userModel.overview = req.body.overview;
  }
  if (req.body.companyName) {
    req.userModel.companyName = req.body.companyName;
  }

  req.userModel.save()
  .then((updatedUser) => {
    console.log(updatedUser)
    res.json(updatedUser);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.userModel);
}

function list(req, res, next) {
  let where = {};
  if (req.user.role === ROLES.MANAGER) {
    where = { role: { $ne: ROLES.ADMIN } };
  }

  User.find(where)
  .then((users) => {
    res.json(users);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.userModel.remove(() => {
    res.json(req.userModel);
  })
  .catch(next);
}

function getUserByID(req, res, next, id) {
  User.findById(id)
  .then((user) => {
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    req.userModel = user;
    next();
  })
  .catch(next);
}

function getProfile(req, res, next) {
  console.log('get profile')
  User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    req.userModel = user;
    
    console.log(req.userModel)
    next();
  })
  .catch(next);
}

function search(req, res, next) {
  console.log("here",req.body)

  User.find(req.body)
  .sort({ userName: -1 })
//  .limit(limit)
 // .populate('user')
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

module.exports = {
  create,
  update,
  updateOne,
  read,
  list,
  search,
  remove,
  getUserByID,
  getProfile,
  uploadFile
};
