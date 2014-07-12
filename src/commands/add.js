var common = require('../common');
var tasks = require('../tasks');

module.exports.run = function(params) {
    if (params.length == 0) {
        common.terminal.error(common.resource.badParameters);
    }

    tasks.create(params.join(' '), function(newTask) {
        common.terminal.print(common.resource.addSuccessful);
    });
};
