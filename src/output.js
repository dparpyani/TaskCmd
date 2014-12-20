var colors = require('colors/safe');
var moment = require('moment');
var sprintf = require('sprintf-js').sprintf;

colors.setTheme({
    input: 'grey',
    header: 'grey',
    task: 'cyan',
    info: 'green',
    help: 'cyan',
    warn: 'yellow',
    error: 'red',
    debug: 'yellow'
});

module.exports.debug = function(message) {
    if (taskcmd.env == 'development') {
        console.log(colors.debug('[debug] ' + message));
    }
};

module.exports.warn = function(message) {
    console.log(colors.warn(message));
};

module.exports.error = function(err) {
    console.error(colors.error('[error] ' + err));
    process.exit(1);
};

module.exports.info = function(message) {
    console.log(colors.info(message));
};

module.exports.printTasks = function(tasks) {
    var format = '%-18s %-18s %-6s %-s';
    console.log(colors.header(sprintf(
        format,
        'id',
        'created',
        'done',
        'description'
    )));
    tasks.forEach(function(task) {
        console.log(colors.task(sprintf(
            format,
            task._id.toString(),
            moment(task.created).fromNow(),
            task.completed? 'yes': 'no',
            task.description
        )));
    });
};
