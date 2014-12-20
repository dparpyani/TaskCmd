var output = require('../output');

module.exports.run = function(params, storage) {
    var task = {
        description: params.join(' ').trim(),
        created: new Date(),
        completed: null
    }

    if (!task.description) {
        output.error('Task description cannot be empty.');
    }

    storage.insert(task, function(newTask) {
        output.info('Task was successfully created.');
    });
};
