var common = require('../common');
var tasks = require('../tasks');

module.exports.run = function(params) {
    tasks.getAll(function (tasks) {
        if (tasks.length > 0) {
            common.terminal.printTasks(tasks);
        } else {
            common.terminal.print(common.resource.noTasksFound);
        }
    });
};
