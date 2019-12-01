const mongoose = require('mongoose');
const Invoice = require('../models/invoice.model');
const ROLES = require('../constants/role');
const STATUS = require('../constants/status')
function create(req, res, next) {
  const invoice = new Invoice(req.body);

  invoice.save()
  .then((newInvoice) => {
    res.json(newInvoice);
  })
  .catch(next);
}

function update(req, res, next) {
  Object.assign(req.invoice, {...req.body, status: STATUS.INVOICE_SENT});

  req.invoice.save()
  .then((updatedInvoice) => {
    res.json(updatedInvoice);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.invoice);
}

function list(req, res, next) {
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }

  Invoice.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function getMyInvoice(req, res, next) {
  console.log("getMyInvoice", req.user)
  let where = {};
  // if (req.user.role === ROLES.CLIENT) {
  //   where = { user: req.user._id };
  // }
  if (!req.user.role) {      
    res.status(500).json({ message: 'Invalid request' });
    return;
  }
  if (req.user.role == 'client') {
    where = {
      sender: req.user._id
    }
  } else if (req.user.role == 'provider') {
    where = {
      receiver: req.user._id,
      status: [STATUS.INVOICE_SENT, STATUS.INVOICE_RECEIVED]
    }
  }
  Invoice.find(where)
  .then((entries) => {
    res.json(entries);
  })
  .catch(next);
}

function remove(req, res, next) {
  req.invoice.remove(() => {
    res.json(req.invoice);
  })
  .catch(next);
}

function getInvoiceByID(req, res, next, id) {
  Invoice.findById(id)
  .then((invoice) => {
    if (!invoice) {
      res.status(404).json({ message: 'Invoice not found' });
      return;
    }

    // if (invoice.user.toString() !== req.user._id && req.user.role !== ROLES.ADMIN) {
    //   res.status(403).json({ message: 'You are not authorized to access this invoice' });
    //   return;
    // }

    req.invoice = invoice;
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
  getInvoiceByID,
  getMyInvoice
};
