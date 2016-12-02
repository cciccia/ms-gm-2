'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
var host = process.env.APP_HOST || 'localhost';

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

app.all(['/public/*', '*.hot-update.json'], function (req, res) {
    proxy.web(req, res, {
        target: 'http://' + host + ':3001'
    });
});

app.set('view engine', 'pug');

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
