/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const backendSetup = require('./middlewares/backendMiddleware');
const resolve = require('path').resolve;
const app = express();
var xmpp = require('simple-xmpp');

var jid = 'system@localhost/spark';
var pwd = 'HVRsystem123$%^';
var server = 'localhost';

xmpp.on('online', function(data) {
    console.log('Connected with JID: ' + data.jid.user);
    xmpp.send('testjs@007jabber.com', 'hello! time is '+new Date(), false);
});

xmpp.on('error', function(err) {
    console.error("error:", JSON.stringify(err));
});

xmpp.connect({
    jid: jid,
    password: pwd,
    host: server,
    port: 5222
});
backendSetup(app);

// In production we need to pass these values in instead of relying on webpack
app.use(express.static('public'))
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).send({ error: (err && err.message) || 'Something went wrong on the server' });
});


// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
});
