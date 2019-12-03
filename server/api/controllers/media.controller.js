const mongoose = require('mongoose');
const Media = require('../models/media.model');
const Job = require('../models/job.model');
const ROLES = require('../constants/role');
const STATUS = require('../constants/status')
function create(req, res, next) {
  const media = new Media(req.body);

  media.save()
  .then((newMedia) => {
    res.json(newMedia);
  })
  .catch(next);
}

function uploadLink(req, res, next) {
  console.log("uploadLink", req.body)
  if (!req.body.id || !req.body.link) {
    res.status(500).json({ message: 'Invalid request' });
    return;
  }
  Job.findById(req.body.id)
  .then((job) => {
    if (!job) {
      res.status(404).json({ message: 'Jobs Not Found' });
      return;
    }
    let updatedJob = new Job(
      Object.assign(job, {
        status: STATUS.TESTING,
      })
    )
    updatedJob.save()
      .then((newJob) => {
        xmpp.send(`${newJob.creator}@desktop-jgen8l2/spark`, `uploaded the media.`, false);
        res.json(newJob);
      })
    .catch(next)

    // const media = new Media(req.body);

    // media.save()
    // .then((newMedia) => {
    //   res.json(newMedia);
    // })
    // .catch(next);  
  })
  .catch(next)
}

function update(req, res, next) {
  Object.assign(req.media, req.body);

  req.media.save()
  .then((updatedMedia) => {
    res.json(updatedMedia);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.media);
}

function list(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  Media.find(where)
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
  if (req.body.collections) {
    where = {_id: req.body.collections}
  } else if (req.body.title) {
    where = {title: {$regex: req.body.title, $options:"$i"}}
  }
  console.log("search", where)
  Media.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.media.remove(() => {
    res.json(req.media);
  })
  .catch(next);
}

function getMediaByID(req, res, next, id) {
  Media.findById(id)
  .then((media) => {
    if (!media) {
      res.status(404).json({ message: 'Media not found' });
      return;
    }

    // if (media.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //   res.status(403).json({ message: 'You are not authorized to access this media' });
    //   return;
    // }

    req.media = media;
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
  getMediaByID,
  search,
  uploadLink
};
