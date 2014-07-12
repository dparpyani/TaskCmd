var nedb = require('nedb');
var path = require('path');
var datastore = require('./datastore');

taskcmd = { // global
    env: 'development',
    dir: '.taskcmd'
};

module.exports.init = function() {
    taskcmd.datastore = datastore.find();
    taskcmd.db = {
        tasks: new nedb({
            filename: path.join(taskcmd.datastore, 'tasks.db'),
            autoload: true
        })
    };
};
