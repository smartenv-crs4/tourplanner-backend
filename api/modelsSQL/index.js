
"use strict";

/**
 * @module SQL-models-connection
 * @description
 *
 * This code is inside ./api/modelsSQL/index.js
 *
 * Autoload all *.js models file and return object connection
 *
 * 
 */

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var dbConfig = require("config");
var config = dbConfig.get("db.mysql");
var sequelize = new Sequelize(config.database, config.username, config.password, config.options);

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== basename);
    })
    .forEach(function (file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;
