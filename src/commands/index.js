var common = require('../common');
var init = require('./init');
var add = require('./add');
var remove = require('./remove');
var list = require('./list');
var help = require('./help');

var registeredCommands = [];
function registerCommand(names, callback) {
    registeredCommands.push({
        names: names,
        callback: callback
    });
}

// Runs the command with the specified parameters
module.exports.run = function(cmd, params) {
    var callback = null;
    registeredCommands.forEach(function (rcmd) {
        if ((typeof(rcmd.names) == 'string' && rcmd.names == cmd) || rcmd.names.indexOf(cmd) != -1)
        {
            callback = rcmd.callback;
        }
    });

    if (callback == null) {
        common.terminal.error(common.resource.commandNotFound);
    } else {
        common.terminal.debug('Running \'' + cmd + '\' with params: ' + params);
        callback(params);
    }
};

// Register all supported commands
registerCommand('init', init.run);
registerCommand('add', add.run);
registerCommand('remove', remove.run);
registerCommand('list', list.run);
registerCommand('help', help.run);
