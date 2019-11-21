const mongoose = require('mongoose');
const ROLES = require('../constants/role');
const axios = require('axios')
const ip = require('ip')

function getArchivedMessages(req, res, next) {
  console.log("getArchivedMessages", req.body, req.params, req.user._id)
  let data = {
    username: req.user._id,
  }
  axios.request({
    url: `http://${ip.address()}:7070/rest/api/restapi/v1/chat/${req.user._id}/messages?to=${req.params.to}`,
    method: 'get',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'EXasUbJWkU82fqG8'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((messages) => {
    res.json(messages.data)})
  .catch(next)
}

module.exports = {
  getArchivedMessages,
};
