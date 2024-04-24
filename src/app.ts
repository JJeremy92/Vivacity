var express = require('express');
var routes = require('./routes');

const appServer = express();

appServer.use(express.json());
appServer.use('/', routes);

module.exports = appServer;