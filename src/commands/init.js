var common = require('../common');
var datastore = require('../datastore');

module.exports.run = function(params) {
    if (params.length > 0) {
        common.terminal.error(common.resource.badParameters);
    }

    try {
        var datastorePath = datastore.create();
        common.terminal.print(common.resource.initializedAt(datastorePath));
    } catch (err) {
        if (err.code == 'EEXIST') { // Data store already exists
            common.terminal.error(common.resource.alreadyInitialized);
        } else {
            throw err;
        }
    }
};
