var output = require('../output');
var commands = {
    init: require('./init'),
    add: require('./add'),
    remove: require('./remove'),
    list: require('./list'),
    help: require('./help')
};

var registeredCommands = [];

function registerCommand(aliases, runner) {
    registeredCommands.push({
        aliases: aliases,
        runner: runner
    });
}

// Register all supported commands
registerCommand(['init'], commands.init.run);
registerCommand(['add', 'new'], commands.add.run);
registerCommand(['rm', 'remove', 'delete'], commands.remove.run);
registerCommand(['ls', 'list'], commands.list.run);
registerCommand(['help'], commands.help.run);

// Runs a command with the specified parameters and storage engine
module.exports.run = function(cmd, params, storage) {
    var runner = null;
    registeredCommands.forEach(function (rcmd) {
        if (rcmd.aliases.indexOf(cmd) != -1)
        {
            runner = rcmd.runner;
        }
    });

    if (runner == null) {
        output.error('Invalid command.');
    } else {
        if (params.length == 0) {
            output.debug('Running \'' + cmd + '\'');
        } else {
            output.debug('Running \'' + cmd + '\' with params: ' + params.join(', '));
        }

        runner(params, storage);
    }
};
