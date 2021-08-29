const path = require('path');
const express = require('express');
const compression = require('compression');

const app = express();
let env = process.env.NODE_ENV || 'development';
app.use(compression());

let forceSSL = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'production') {
  app.use(forceSSL);
}

// Serve static files
app.use(express.static(__dirname + '/dist/skolera-v2'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/skolera-v2/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5000);
