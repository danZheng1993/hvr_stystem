const Orders = require('../models/order.model');

function create(req, res, next) {
  if (!req.user) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  const order = new Orders(req.body);

  order.save()
  .then((newOrder) => {
    res.json(newOrder);
  })
  .catch(next);
}

function update(req, res, next) {
  if (!req.user) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  Object.assign(req.order, req.body);

  req.order.save()
  .then((updatedOrder) => {
    res.json(updatedOrder);
  })
  .catch(next);
}

function read(req, res) {
  if (!req.user) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  res.json(req.order);
}

function list(req, res, next) {
  if (!req.user) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  const pageSize = +req.query.page_size || 10
  const page = +req.query.page || 1
  const where = {};
  if (req.query.filter) {
    const filter = JSON.parse(req.query.filter)
    if (filter) {
      if (filter.keyword) {
        where.$or = [
          { orderNumber: { '$regex': filter.keyword } },
          { phoneNumber: { '$regex': filter.keyword } },
        ];
      }
      if (filter.status) {
        where.status = filter.status
      }
    }
  }
  Orders.count(where)
   .then ((count) => {
    Orders.find(where)
    .limit(pageSize)
    .skip(pageSize * (page-1))
    .then((orders) => {
         res.json({orders, count});
    })
    .catch(next);
  })
  .catch(next)
}


function remove(req, res, next) {
  if (!req.user) {
    res.status(401).json({ message: 'You are not authorized' });
    return;
  }
  req.order.remove()
  .then((updatedOrder) => {
    res.json(updatedOrder);
  })
  .catch(next);
}

module.exports = {
  create,
  update,
  read,
  list,
  remove,
};
