var common = require('./common');
var DataStore = require('nedb');
var fs = require('fs');
var path = require('path');
var output = require('../../output');

var LocalStorage = function(dirname, filename) {
    this.dirname = dirname;
    this.filename = filename;
};

LocalStorage.prototype.isInitialized = function() {
    var dirpath = common.upwardSearch(this.dirname);
    var dirExists = Boolean(dirpath);
    if (dirExists) {
        var filepath = path.join(dirpath, this.filename);
        var fileExists = fs.existsSync(filepath);
        return fileExists;
    }
    return false;
};

LocalStorage.prototype.init = function() {
    if (this.isInitialized()) {
        throw new Error('This project has already been initialized before.');
    } else {
        var dirpath = common.createDir(this.dirname);
        var filepath = path.join(dirpath, this.filename);
        fs.closeSync(fs.openSync(filepath, 'w'));
        return dirpath;
    }
};

LocalStorage.prototype.db = function() {
    if (this._db) { return this._db; }
    var dirpath = common.upwardSearch(this.dirname);
    var filepath = path.join(dirpath, this.filename);
    output.debug('Using database: ' + filepath);
    this._db = new DataStore({ filename: filepath, autoload: true });
    return this._db;
};

LocalStorage.prototype.insert = function(item, callback) {
    this.db().insert(item, function(err, newItem) {
        if (err) { throw Error(err.message); }
        return callback(newItem);
    });
};

LocalStorage.prototype.remove = function(query, options, callback) {
    this.db().remove(query, options, function (err, numRemoved) {
        if (err) { throw Error(err.message); }
        return callback(numRemoved);
    });
};

LocalStorage.prototype.find = function(query, sort, callback) {
    this.db().find(query).sort(sort).exec(function(err, tasks) {
        if (err) { throw Error(err.message); }
        return callback(tasks);
    });
};

LocalStorage.prototype.count = function(query, callback) {
    this.db().count(query, function(err, count) {
        if (err) { throw Error(err.message); }
        return callback(count);
    });
};

module.exports = LocalStorage;