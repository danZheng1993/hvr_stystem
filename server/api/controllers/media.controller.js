const mongoose = require('mongoose');
const Media = require('../models/media.model');
const Job = require('../models/job.model');
const ROLES = require('../constants/role');
const STATUS = require('../constants/status')
const xmpp = require('simple-xmpp')
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
  console.log("update media", req.body)
  if (req.user.role !== ROLES.MANAGER) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  if (typeof(req.body.isAllowed) == 'boolean') {
    Object.assign(req.media, {...req.body, tested: new Date()});
  }
  if (typeof(req.body.recommend) == 'boolean') {
    Object.assign(req.media, req.body);
  }

  req.media.save()
  .then((updatedMedia) => {
    res.json(updatedMedia);
  })
  .catch(next);
}

function read(req, res) {
  Media.findById(req.media._id)
  .populate('creator', 'userName phoneNumber location companyName')
  .populate('poster', 'userName phoneNumber location')
  .populate('jobID', 'price')
  .then((media) => {
    console.log(media)
    if (!media) {
      res.status(404).json({ message: 'Media not found' });
      return;
    }

    // if (media.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //   res.status(403).json({ message: 'You are not authorized to access this media' });
    //   return;
    // }

    res.json(media);
  })
  .catch();
}

function list(req, res, next) {
  console.log("media",req.query)
  if (req.user.role !== ROLES.MANAGER   && req.user.role !== ROLES.CLIENT) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  let page_size = +req.query.page_size || 10
  let page = +req.query.page || 1
  let where = {};
  if (req.query.filter) {
    let filter = JSON.parse(req.query.filter)
    if (filter) {
      filter.checkOption &&(where['checkOption'] = filter.checkOption)
      filter.title && (where['title'] = {$regex: filter.title, $options:"$i"})
      filter.publicOption && (where['publicOption'] = (filter.publicOption == 'true' ? true: false))
      if (filter.startDate || filter.endDate) {
        let created = {}
        filter.startDate && (created['$gte'] = filter.startDate)
        filter.endDate && (created['$lte'] = filter.endDate)
        where['created'] = created
      }
    }
    console.log(where)
  }
  Media.count(where)
   .then ((count) => {
    Media.find(where)
    .limit(page_size)
    .skip(page_size * (page-1))
    .populate('creator', 'userName photo')
    .then((medias) => {
         res.json({medias, count});
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
  if (req.body.collections) {
    where = {_id: req.body.collections}
  } else if (req.body.title) {
    where = {title: {$regex: req.body.title, $options:"$i"}}
  }
  console.log("search", where)
  Media.find(where)
  .populate('creator', 'userName photo')
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

    // if (media.creator.toString() !== req.user._id && req.user.role !== ROLES.MANAGER) {
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
