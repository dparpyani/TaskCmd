var output = require('../output');

module.exports.run = function(params, storage) {
    params.forEach(function(id) {
        storage.remove({_id: id}, {}, function (numRemoved) {
            if (numRemoved == 1) {
                output.info('Removed task with id: ' + id);
            }
        });
    });
};