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
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  News.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
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
  req.news.remove(() => {
    res.json(req.news);
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

    if (news.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
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
