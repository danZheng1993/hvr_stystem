const mongoose = require('mongoose');
const Invoice = require('../models/invoice.model');
const ROLES = require('../constants/role');
const STATUS = require('../constants/status')
const xmpp = require('simple-xmpp')
var formidable = require('formidable');
var fs = require('fs');
var path = require('path')

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
    xmpp.send(`${updatedInvoice.receiver}@desktop-jgen8l2/spark`, `${req.user.userName} sent invoice`, false);
    res.json(updatedInvoice);
  })
  .catch(next);
}

function read(req, res) {
  res.json(req.invoice);
}

function list(req, res, next) {
  console.log("news",req.query)
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
      filter.phoneNumber && (where['phoneNumber'] = filter.phoneNumber)
      filter.status && (where['status'] = filter.status)
    }
    console.log(where)
  }
  Invoice.count(where)
   .then ((count) => {
    Invoice.find(where)
    .limit(page_size)
    .skip(page_size * (page-1))
    .populate('sender', 'userName')
    .then((invoices) => {
         res.json({invoices, count});
    })
    .catch(next);
  })
  .catch(next)
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
  .populate('jobID', 'type')
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

function upload(req, res, next) {
  console.log(">>uploadFile")
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (!files) return;
    var oldpath = files.photo.path;
    var directory = process.cwd() + '\\public\\invoiceImage\\'
    var fileName = req.invoice._id + path.extname(files.photo.name);
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
    console.log("update Invoice...")
    Object.assign(req.invoice, {path: fileName, status: STATUS.INVOICE_RECEIVED});

    req.invoice.save()
    .then((updatedInvoice) => {
      xmpp.send(`${updatedInvoice.sender}@desktop-jgen8l2/spark`, `${req.user.userName} billed invoice`, false);
      res.json(updatedInvoice);
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
  upload,
  getInvoiceByID,
  getMyInvoice
};
