/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
var https = require('https');
var fs = require('fs');
var cors = require('cors');

const argv = require('./argv');
const port = require('./port');
const backendSetup = require('./middlewares/backendMiddleware');
const resolve = require('path').resolve;
const app = express();

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
app.use(cors());
backendSetup(app);

// In production we need to pass these values in instead of relying on webpack


app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(500).send({ error: (err && err.message) || 'Something went wrong on the server' });
});


// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
https.createServer(options, app).listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
});
