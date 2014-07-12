var common = require('../common');
var init = require('./init');
var add = require('./add');
var remove = require('./remove');
var list = require('./list');
var help = require('./help');

module.exports.registeredCommands = [];

// Runs the command with the specified parameters
module.exports.run = function(cmd, params) {
    var callback = null;
    module.exports.registeredCommands.forEach(function (rcmd) {
        if (rcmd.aliases.indexOf(cmd) != -1)
        {
            callback = rcmd.callback;
        }
    });

    if (callback == null) {
        common.terminal.error(common.resource.badCommand);
    } else {
        if (params.length == 0) {
            common.terminal.debug('Running \'' + cmd + '\'')
        } else {
            common.terminal.debug('Running \'' + cmd + '\' with params: ' + params.join(', '));
        }

        callback(params);
    }
};

function registerCommand(aliases, callback) {
    module.exports.registeredCommands.push({
        aliases: aliases,
        callback: callback
    });
}

// Register all supported commands
registerCommand(['init'], init.run);
registerCommand(['add', 'new'], add.run);
registerCommand(['rm', 'remove'], remove.run);
registerCommand(['ls', 'list'], list.run);
registerCommand(['help'], help.run);
