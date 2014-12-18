var output = require('../output');

module.exports.run = function(params, storage) {
    storage.get(null, function (tasks) {
        if (tasks.length > 0) {
            tasks.forEach(function(task) {
                output.printTask(task);
            });
        } else {
            output.print('No tasks found.');
        }
    });
};
