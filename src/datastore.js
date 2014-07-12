var fs = require('fs');
var path = require('path');
var common = require('./common');

// Traverse up the directory tree looking for the item (file/directory)
function upwardSearch(item, cwd, prev) {
    if (prev == undefined) {
        prev = '';
    }

    if (path.join(cwd) == path.join(prev)) {
        return null;
    } else if (fs.existsSync(path.join(cwd, item))) {
        return path.join(cwd, item);
    } else {
        return upwardSearch(item, path.join(cwd, '..'), cwd);
    }
}

// Find the path to the data store
module.exports.find = function() {
    var result = upwardSearch(taskcmd.dir, process.cwd());
    if (result == null) {
        common.terminal.error(common.resource.notInitialized);
    } else {
        common.terminal.debug('Data store found at: ' + result);
        return result;
    }
}

// Create data store directory
module.exports.create = function() {
    var datastorePath = path.join(process.cwd(), taskcmd.dir);
    fs.mkdirSync(datastorePath);
    return datastorePath;
};