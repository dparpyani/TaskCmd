var output = require('../output');

module.exports.run = function(params, storage) {
    var task = {
        description: params.join(' ').trim(),
        created: new Date(),
        completed: null
    }

    if (!description) {
        output.error('Task description cannot be empty.');
    }

    storage.create(task, function(newTask) {
        output.print('Task was successfully created.');
    });
};
