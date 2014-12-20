var output = require('../output');

module.exports.run = function(params, storage) {
    storage.remove({ _id: params[0] }, {}, function (numRemoved) {
        output.info(numRemoved.toString() + ' tasks were removed.');
    });
};