module.exports.debug = function(message) {
    if (taskcmd.env == 'development') {
        console.log('[debug] ' + message);
    }
};

module.exports.error = function(err) {
    console.error('[error] ' + err);
    process.exit(1);
};

module.exports.print = function(message) {
    console.log(message);
};

module.exports.printTask = function(task) {
    console.log(task.description);
};
