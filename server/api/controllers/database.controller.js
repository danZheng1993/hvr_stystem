const Database = require('../models/database.model');
const ROLES = require('../constants/role');
var fs = require('fs');
var backup = require('mongodb-backup');
var restore = require('mongodb-restore');

function create(req, res, next) {
  const fileName = new Date().getTime() + '.tar'
  const directory = process.cwd() + '\\backup\\'

  backup({
    uri: 'mongodb://localhost:27017/HVR', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: directory,
    tar: fileName, // save backup into this tar file
    callback: function(err, data) {
      if (err) {
        res.status(401).json({ message: 'Backup Errror' + err });
        return;
      } else {
        const stats = fs.statSync(directory + fileName);
        const fileSizeInBytes = stats.size;
        //Convert the file size to megabytes (optional)
        const database = new Database({name: fileName, size: fileSizeInBytes});
        if (req.user.role !== ROLES.MANAGER) {
          res.status(401).json({ message: 'You are not authorized' });
          return;
        }
        database.save()
        .then((newDatabase) => {
          res.json(newDatabase);
        })
        .catch(next);
        console.log('finish');
      }
    }
  })
}

function restoreDatabase(req, res, next) {
  const fileName = req.database.name
  const directory = process.cwd() + '\\backup\\'
  restore({
    uri: 'mongodb://localhost:27017/HVR', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: directory,
    tar: fileName, // restore backup from this tar file
    drop: true,
    callback: function(err, data) {
      if (err) {
        res.status(401).json({ message: 'Restore Errror' + err });
        return;
      } else {
        console.log("restore Success!")
        res.json({ message: 'success'});
        return;
      }
    }
  })
}

function list(req, res, next) {
  console.log("database",req.query)
  if (req.user.role !== ROLES.MANAGER) {
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
  Database.count(where)
   .then ((count) => {
    Database.find(where)
    .limit(page_size)
    .skip(page_size * (page-1))
    .then((databases) => {
         res.json({databases, count});
    })
    .catch(next);
  })
  .catch(next)
}

function remove(req, res, next) {
  const fileName = req.database.name
  const directory = process.cwd() + '\\backup\\'
  req.database.remove()
  .then((removedDatabase) => {
    fs.unlink(directory + fileName, function (err) {
      if (err) throw err;
    });
    res.json(removedDatabase);
  })
  .catch(next);
}

function getDatabaseByID(req, res, next, id) {
  Database.findById(id)
  .then((database) => {
    if (!database) {
      res.status(404).json({ message: 'Database not found' });
      return;
    }

    if (req.user.role !== ROLES.MANAGER) {
      res.status(403).json({ message: 'You are not authorized to access this database' });
      return;
    }

    req.database = database;
    next();
  })
  .catch(next);
}

module.exports = {
  create,
  list,
  remove,
  restoreDatabase,
  getDatabaseByID,
};
