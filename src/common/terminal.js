module.exports.debug = function(message) {
    if (taskcmd.env == 'development') {
        console.log('[debug] ' + message);
    }
};

module.exports.print = function(message) {
    console.log(message);
};

module.exports.printTask = function(task) {
    console.log(task.description);
};

module.exports.printTasks = function(tasks) {
    tasks.forEach(function(task) {
        module.exports.printTask(task);
    });
};

module.exports.error = function(err) {
    console.error('[error] ' + err);
    process.exit(1);
};

module.exports.exit = function() {
    process.exit(0);
};
