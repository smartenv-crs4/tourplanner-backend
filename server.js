/**
 * @description
 * bootstrap application file
 *
 * @module server.js
 */

console.log('\x1b[32m Starting server....\x1b[0m');

var express = require('express');
var path = require('path');
//var env = process.env.NODE_ENV || "development";
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var errors = require('./lib/errors'); // mange http errors 404,500
var config = require("config");
var routes = require('json-routing');
var sql = require(config.base.pathModelsSQL);
var start = require('node-startinfo');
var debug = require('debug')('shoutserver:server');
var port = normalizePort(process.env.PORT || config.base.port);


app.set('port', port);
//var pathModelsNOSQL = require(config.base.pathModelsNOSQL);


app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public'))); // remove, only for avatar test ->giorgio
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


global.app = app; // express app
global.config = config; // application config
global.sql = sql; // db sql

routes(app, config.get('routes')); // load routes
errors.init(app); // manage errors

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}


/**
 * loading http server if required
 */
    var http = require('http');
    var server = http.createServer(app);
    server.listen(port);
    start.displayError(server);
    start.displayInfo(server);
    
module.exports = app;