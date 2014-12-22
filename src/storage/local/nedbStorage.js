var common = require('./common');
var DataStore = require('nedb');
var fs = require('fs');
var path = require('path');
var output = require('../../output');

function GetDb(path) {
    if (fs.existsSync(path)){
        return new DataStore({ filename: path, autoload: true });
    } else {
        throw new Error('No task database exists at path: ' + path);
    }
}

var LocalStorage = function(dirname, filename) {
    this.dirname = dirname;
    this.filename = filename;
    this.path = path.join(dirname, filename);
}

LocalStorage.prototype.isInitialized = function() {
    var dirPath = common.upwardSearch(this.dirname);
    var isInitialized = Boolean(dirPath);
    if (isInitialized) {
        output.debug('Directory(' + this.dirname + ') found at: ' + dirPath);
        this.db = GetDb(this.path);
    }
    return isInitialized;
};

LocalStorage.prototype.init = function() {
    var dirPath;
    try {
        dirPath = common.createDir(this.dirname);
    } catch (err) {
        if (err.code == 'EEXIST') { // Directory already exists
            throw new Error('This project has already been initialized before.');
        } else {
            throw err;
        }
    }
    this.db = GetDb(this.path);
    return dirPath;
};

LocalStorage.prototype.insert = function(item, callback) {
    this.db.insert(item, function(err, newItem) {
        if (err) { throw Error(err.message); }
        return callback(newItem);
    });
};

LocalStorage.prototype.remove = function(query, options, callback) {
    this.db.remove(query, options, function (err, numRemoved) {
        if (err) { throw Error(err.message); }
        return callback(numRemoved);
    });
};

LocalStorage.prototype.find = function(query, sort, callback) {
    this.db.find(query).sort(sort).exec(function(err, tasks) {
        if (err) { throw Error(err.message); }
        return callback(tasks);
    });
};

LocalStorage.prototype.count = function(query, callback) {
    this.db.count(query, function(err, count) {
        if (err) { throw Error(err.message); }
        return callback(count);
    });
};

module.exports = LocalStorage;