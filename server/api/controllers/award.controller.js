const Award = require('../models/award.model');
const ROLES = require('../constants/role');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path')
function create(req, res, next) {
  const award = new Award(req.body);

  award.save()
  .then((newAward) => {
    res.json(newAward);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.award, req.body);

  req.award.save()
  .then((updatedAward) => {
    res.json(updatedAward);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.award);
}

function list(req, res, next) {
  console.log("award",req.query)
  if (req.user.role !== ROLES.MANAGER && req.user.role !== ROLES.CLIENT) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  let page_size = +req.query.page_size || 10
  let page = +req.query.page || 1
  let where = {};
  if (req.query.filter) {
    let filter = JSON.parse(req.query.filter)
    if (filter) {
      filter.title && (where['title'] = {$regex: filter.title, $options:"$i"})
      if (filter.startDate || filter.endDate) {
        let created = {}
        filter.startDate && (created['$gte'] = filter.startDate)
        filter.endDate && (created['$lte'] = filter.endDate)
        where['created'] = created
      }
    }
    console.log(where)
  }
  Award.count(where)
   .then ((count) => {
    Award.find(where)
    .limit(page_size)
    .skip(page_size * (page-1))
    .then((awards) => {
         res.json({awards, count});
    })
    .catch(next);
  })
  .catch(next)
}

function search(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }
  if (req.body.title) {
    where = {title: {$regex: req.body.title, $options:"$i"}}
  }
  console.log("search Award", where)
  Award.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}


function remove(req, res, next) {
  req.award.remove()
  .then((updatedAward) => {
    res.json(updatedAward);
  })
  .catch(next);
}

function getAwardByID(req, res, next, id) {
  Award.findById(id)
  .then((award) => {
    if (!award) {
      res.status(404).json({ message: 'Award not found' });
      return;
    }0

    if (req.user.role !== ROLES.MANAGER) {
      res.status(403).json({ message: 'You are not authorized to access this award' });
      return;
    }

    req.award = award;
    next();
  })
  .catch(next);
}


function upload(req, res, next) {
  console.log("uploadFile")
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (!files || !fields) {
      res.status(500).json({ message: 'invalid request' });
      return;
    }
    console.log(fields)
    var oldpath = files.image.path;
    var directory = process.cwd() + '\\public\\awardsImage\\'
    const currentTime = new Date().getTime()
    var fileName = currentTime + path.extname(files.image.name);
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
    const award = new Award({...fields, users: fields.users.split(','), image: fileName});

    award.save()
    .then((newAward) => {
      res.json(newAward);
    })
    .catch(next);
 });
}

module.exports = {
  create,
  update,
  read,
  list,
  remove,
  getAwardByID,
  search,
  upload,
};