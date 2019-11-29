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
  if (req.body.location) {
    req.userModel.location = req.body.location;
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

function addToContacts(req, res, next) {
  console.log("addToContacts")
  console.log(req.body)

  if (req.body.contact) {
    let contacts = req.userModel.contacts
    if (contacts.indexOf(req.body.contact) != -1) {
      res.status(500).json({message: 'Duplication Error'})
      return;
    }
    contacts.push(req.body.contact)
    req.userModel.contacts = contacts;
    req.userModel.save()
    .then((updatedUser) => {
      console.log(updatedUser)
      res.json(updatedUser);
    })
    .catch(next);
  } else {
    res.status(500).json({message: 'Invalid request'})
  }
}

function addToCollections(req, res, next) {
  console.log("addToCollections")
  console.log(req.body)

  if (req.body.collection) {
    let collections = req.userModel.collections
    if (collections.indexOf(req.body.collection) != -1) {
      res.status(500).json({message: 'Duplication Error'})
      return;
    }
    collections.push(req.body.collection)
    req.userModel.collections = collections;
    req.userModel.save()
    .then((updatedUser) => {
      console.log(updatedUser)
      res.json(updatedUser);
    })
    .catch(next);
  } else {
    res.status(500).json({message: 'Invalid request'})
  }
}

function removeFromCollections(req, res, next) {
  console.log("removeFromCollections")
  console.log(req.body)

  if (req.body.collection) {
    let collections = req.userModel.collections
    let index = collections.indexOf(req.body.collection) 
      if (index == -1) {
      res.status(500).json({message: 'Collection Not Found'})
      return;
    }
    collections.splice(index, 1)
    req.userModel.collections = collections;
    req.userModel.save()
    .then((updatedUser) => {
      console.log(updatedUser)
      res.json(updatedUser);
    })
    .catch(next);
  } else {
    res.status(500).json({message: 'Invalid request'})
  }
}

function addToAttentions(req, res, next) {
  console.log("addToAttentions")
  console.log(req.body)

  if (req.body.attention) {
    let attentions = req.userModel.attentions
    if (attentions.indexOf(req.body.attention) != -1) {
      res.status(500).json({message: 'Duplication Error'})
      return;
    }
    attentions.push(req.body.attention)
    req.userModel.attentions = attentions;
    req.userModel.save()
    .then((updatedUser) => {
      console.log(updatedUser)
      res.json(updatedUser);
    })
    .catch(next);
  } else {
    res.status(500).json({message: 'Invalid request'})
  }
}

function removeFromAttentions(req, res, next) {
  console.log("removeFromAttentions")
  console.log(req.body)

  if (req.body.attention) {
    let attentions = req.userModel.attentions
    let index = attentions.indexOf(req.body.attention) 
      if (index == -1) {
      res.status(500).json({message: 'Collection Not Found'})
      return;
    }
    attentions.splice(index, 1)
    req.userModel.attentions = attentions;
    req.userModel.save()
    .then((updatedUser) => {
      console.log(updatedUser)
      res.json(updatedUser);
    })
    .catch(next);
  } else {
    res.status(500).json({message: 'Invalid request'})
  }
}

function getContacts(req, res, next) {
  console.log("getContacts")
  console.log(req.userModel.contacts)

  User.find({_id: {$in: req.userModel.contacts}})
  .select('_id userName photo overview')
  .exec()
  .then((contacts) => {
    console.log(contacts)
    res.json(contacts);
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
  console.log("search",req.body)
  let where = {role: 'provider'}
  if (req.body.attentions) {
    where = {_id: req.body.attentions, role: 'provider'}
  } else if (req.body.userName) {
    where = {userName: {$regex: req.body.userName, $options:"$i"}, role: 'provider'}
  }
  User.find(where)
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
  uploadFile,
  addToContacts,
  addToCollections,
  addToAttentions,
  removeFromCollections,
  removeFromAttentions,
  getContacts
};
