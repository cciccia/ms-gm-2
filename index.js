var nodemon = require('nodemon');
var path = require('path');

var bundle = require('./bundler.js');
bundle();

nodemon({
    execMap: {
        js: 'node'
    },
    script: path.join(__dirname, 'server/server'),
    ignore: [],
    watch: ['server/*', 'common/*'],
  ext: 'js'
}).on('restart', function() {
  console.log('Backend restarted!');
});