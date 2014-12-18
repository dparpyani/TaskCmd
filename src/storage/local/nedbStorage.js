var common = require('./common');
var DataStore = require('nedb');
var path = require('path');
var output = require('../../output');

function GetDb(path) {
    return new DataStore({ filename: path, autoload: true });
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

LocalStorage.prototype.create = function(item, callback) {
    this.db.insert(item, function (err, newItem) {
        if (err) { throw err; }
        return callback(newItem);
    });
};

LocalStorage.prototype.delete = function(id, callback) {

};

LocalStorage.prototype.get = function(id, callback) {
    if (!id) {
        this.db.find({}, function (err, tasks) {
            if (err) { throw err; }
            return callback(tasks);
        });
    } else {

    }
};

module.exports = LocalStorage;