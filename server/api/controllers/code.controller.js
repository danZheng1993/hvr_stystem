const Code = require('../models/code.model');
const ROLES = require('../constants/role');

function create(req, res, next) {
  const code = new Code({
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  });

  if (req.code.role === ROLES.ADMIN && req.body.role) {
    code.role = req.body.role;
  }

  code.save()
  .then((newCode) => {
    res.json(newCode);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.codeModel, {
    codeName: req.body.codeName,
    phoneNumber: req.body.phoneNumber,
  });

  if (req.body.password) {
    req.codeModel.password = req.body.password;
  }

  if (req.code.role === ROLES.ADMIN && req.body.role) {
    req.codeModel.role = req.body.role;
  }

  req.codeModel.save()
  .then((updatedCode) => {
    res.json(updatedCode);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.codeModel);
}

function list(req, res, next) {
  let where = {};
  if (req.code.role === ROLES.MANAGER) {
    where = { role: { $ne: ROLES.ADMIN } };
  }

  Code.find(where)
  .then((codes) => {
    res.json(codes);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.codeModel.remove(() => {
    res.json(req.codeModel);
  })
  .catch(next);
}

function getCodeByID(req, res, next, id) {
  Code.findById(id)
  .then((code) => {
    if (!code) {
      res.status(404).json({ message: 'Code not found' });
      return;
    }

    req.codeModel = code;
    next();
  })
  .catch(next);
}

function getProfile(req, res, next) {
  Code.findById(req.code._id)
  .then((code) => {
    if (!code) {
      res.status(404).json({ message: 'Code not found' });
      return;
    }

    req.codeModel = code;
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
  getCodeByID,
  getProfile,
};
