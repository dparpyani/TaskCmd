module.exports.create = function(description, callback) {
    var task = {
        description: description,
        created: new Date(),
        completed: null
    }

    taskcmd.db.tasks.insert(task, function (err, newTask) {
        if (err) { throw err; }
        callback(newTask);
    });
};

module.exports.getAll = function(callback) {
    taskcmd.db.tasks.find({}, function (err, tasks) {
        if (err) { throw err; }
        callback(tasks);
    });
};
