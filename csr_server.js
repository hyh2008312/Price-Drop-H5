var throng = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 1;
var PORT = process.env.PORT || 5000;
var ENV = process.env.ENV || 'local';

// support multi http request
throng({
  workers: WORKERS,
  lifetime: Infinity
}, start);

function start() {
  var compression = require('compression');
  var express = require('express');
  var morgan = require('morgan');
  var prerender = require('prerender-node');
  var app = express();

  app.use(morgan('dev'));
  app.use('*', function(req, res, next) {
    var shouldRedirect = false;
    var host = req.get('Host');

    if (req.headers['x-forwarded-proto'] !== 'https') {
      shouldRedirect = true;
    }

    if (shouldRedirect && ENV !== 'local') {
      res.redirect(301, 'https://' + host + req.originalUrl);
    } else {
      next();
    }
  });
  app.use(prerender.set('prerenderToken', 'W7C9qOob3QilKJiMu1XN'));
  app.use(compression());
  app.use(express.static('' + __dirname + '/dist/browser'));
  app.use(function(req, res) {
    res.sendfile('dist/browser/index.html');
  });

  app.listen(PORT, onListen);

  function onListen() {
    console.log('Listening on', PORT);
  }
}
