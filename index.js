var nodemon = require('nodemon');
var path = require('path');

var bundle = require('./bundler.js');
bundle();

nodemon({
    script: path.join(__dirname, 'server/server'),
    ignore: [],
    watch: ['server/*', 'common/*', 'ms/*'],
}).on('restart', function() {
  console.log('Backend restarted!');
});