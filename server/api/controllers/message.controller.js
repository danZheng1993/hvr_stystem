const mongoose = require('mongoose');
const Message = require('../models/message.model');
const ROLES = require('../constants/role');

function sendPushyNotification(
  target,
  targetId,
  notificationData,
  notificationBody = {
    body: "You have a notification.",
    badge: 1,
    sound: "ping.aiff",
  }
) {
  if (target === 'user') {
    fetch('https://api.pushy.me/pushy?api_key=112a882e185bf44ffef5eaa14189a1e53c961a0cd2685286c5e09c0726d524a4', {
      method: 'POST',
      body: JSON.stringify({
        to: targetId,
        data: notificationData,
        notification: notificationBody
      })
    });
  } else {
    fetch('https://api.pushy.me/pushy?api_key=112a882e185bf44ffef5eaa14189a1e53c961a0cd2685286c5e09c0726d524a4', {
      method: 'POST',
      body: JSON.stringify({
        to: `/topics/${target}`,
        data: notificationData,
        notification: notificationBody
      })
    });
  }
}

function create(req, res, next) {
  const message = new Message(req.body);
  const { target, targetId, message } = req.body;
  sendPushyNotification(target, targetId, { message })
  message.save()
  .then((newMessage) => {
    res.json(newMessage);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.message);
}

function list(req, res, next) {
  if (req.user.role !== ROLES.MANAGER  && req.user.role !== ROLES.CLIENT) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  let page_size = +req.query.page_size || 10
  let page = +req.query.page || 1
  let where = {};
  if (req.query.filter) {
    let filterType = JSON.parse(req.query.type)
    if (filterType) {
      where['type'] = filterType;
    }
  }
  Message.count(where)
   .then ((count) => {
    Message.find(where)
    .limit(page_size)
    .skip(page_size * (page-1))
    .then((messages) => {
         res.json({messages, count});
    })
    .catch(next);
  })
  .catch(next)
}


function remove(req, res, next) {
  req.message.remove()
  .then((message) => {
    res.json(message);
  })
  .catch(next);
}

function getMessageById(req, res, next, id) {
  Message.findById(id)
  .then((message) => {
    if (!message) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }

    if (req.user.role !== ROLES.MANAGER) {
      res.status(403).json({ message: 'You are not authorized to access this news' });
      return;
    }

    req.message = message;
    next();
  })
  .catch(next);
}

module.exports = {
  create,
  read,
  list,
  remove,
  getMessageById,
  sendPushyNotification,
};
