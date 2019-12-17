const mongoose = require('mongoose');
const News = require('../models/news.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const news = new News(req.body);

  news.save()
  .then((newNews) => {
    res.json(newNews);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.news, req.body);

  req.news.save()
  .then((updatedNews) => {
    res.json(updatedNews);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.news);
}

function list(req, res, next) {
  console.log("news",req.query)
  if (req.user.role !== ROLES.MANAGER  && req.user.role !== ROLES.CLIENT) {
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
  News.count(where)
   .then ((count) => {
    News.find(where)
    .limit(page_size)
    .skip(page_size * (page-1))
    .then((newss) => {
         res.json({newss, count});
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
  console.log("search News", where)
  News.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}


function remove(req, res, next) {
  req.news.remove()
  .then((updatedNews) => {
    res.json(updatedNews);
  })
  .catch(next);
}

function getNewsByID(req, res, next, id) {
  News.findById(id)
  .then((news) => {
    if (!news) {
      res.status(404).json({ message: 'News not found' });
      return;
    }

    if (req.user.role !== ROLES.MANAGER) {
      res.status(403).json({ message: 'You are not authorized to access this news' });
      return;
    }

    req.news = news;
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
  getNewsByID,
  search
};
