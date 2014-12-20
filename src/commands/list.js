var output = require('../output');

module.exports.run = function(params, storage) {
    storage.find({}, { created: -1 }, function (tasks) {
        if (tasks.length > 0) {
            output.printTasks(tasks);
        } else {
            output.warn('No tasks found.');
        }
    });
};
