'use strict';
/*jslint node: true */
/*jshint esversion: 6 */
/*jshint expr: true */
const recluster = require('recluster'),
    path = require('path');

const cluster = recluster(path.join(__dirname, 'server.js'));
cluster.run();

process.on('SIGUSR2', function(){
    console.log('Got SIGUSR2, reloading cluster...');
    cluster.reload();
});

console.log("spawned cluster, kill -s SIGUSR2", process.pid, "to reload");
