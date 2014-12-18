var fs = require('fs');
var path = require('path');

// Traverse up the directory tree looking for the item (file/directory)
module.exports.upwardSearch = function(item, cwd, pwd) {
    if (cwd == undefined) { // Current working directory
        cwd = process.cwd();
    }

    if (pwd == undefined) { // Previous working directory
        pwd = '';
    }

    if (path.join(cwd) == path.join(pwd)) {
        return null; // Item was not found
    } else if (fs.existsSync(path.join(cwd, item))) {
        return path.join(cwd, item); // Return path to item
    } else {
        return module.exports.upwardSearch(item, path.join(cwd, '..'), cwd); // Recursion on parent directory
    }
}

// Create directory relative to cwd
module.exports.createDir = function(dirname) {
    var dirPath = path.join(process.cwd(), dirname);
    fs.mkdirSync(dirPath);
    return dirPath;
};