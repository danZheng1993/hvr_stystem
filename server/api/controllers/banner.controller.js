const Banner = require('../models/banner.model');
const ROLES = require('../constants/role');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path')
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
  console.log("banner",req.query)
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
  Banner.count(where)
   .then ((count) => {
    Banner.find(where)
    .limit(page_size)
    .skip(page_size * (page-1))
    .then((banners) => {
         res.json({banners, count});
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
  console.log("search Banner", where)
  Banner.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}


function remove(req, res, next) {
  req.banner.remove()
  .then((updatedBanner) => {
    res.json(updatedBanner);
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

    if (req.user.role !== ROLES.MANAGER) {
      res.status(403).json({ message: 'You are not authorized to access this banner' });
      return;
    }

    req.banner = banner;
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
    var directory = process.cwd() + '\\public\\bannersImage\\'
    var fileName = fields.id + path.extname(files.image.name);
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
    Banner.updateOne({_id: fields.id}, { $set: {image: fileName }}).exec()
    .then((newBanner) => {
      res.json(newBanner);
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
  getBannerByID,
  search,
  upload,
};
