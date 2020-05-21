const mongoose = require('mongoose');
const Contract = require('../models/contract.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const contract = new Contract(req.body);

  contract.save()
  .then((newContract) => {
    res.json(newContract);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.contract, req.body);

  req.contract.save()
  .then((updatedContract) => {
    res.json(updatedContract);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.contract);
}

function list(req, res, next) {
  let where = {};
  console.log("contractList", req.body, req.query)
  let page_size = +req.query.page_size || 10
  let page = +req.query.page || 1
  if (req.user.role !== ROLES.MANAGER) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  Contract.count({})
  .then ((count) => {
    Contract.find(where)
    .sort({contractged: -1})
    .limit(page_size)
    .skip(page_size * (page-1))
    .then((contracts) => {
      res.json({contracts, count});
    })
    .catch(next);
  })
  .catch(next)
}

function remove(req, res, next) {
  req.contract.remove(() => {
    res.json(req.contract);
  })
  .catch(next);
}

function getContractByID(req, res, next, id) {
  Contract.findById(id)
  .then((contract) => {
    if (!contract) {
      res.status(404).json({ message: 'Contract not found' });
      return;
    }

    // if (contract.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //   res.status(403).json({ message: 'You are not authorized to access this contract' });
    //   return;
    // }

    req.contract = contract;
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
  getContractByID,
};
