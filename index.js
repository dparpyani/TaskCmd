/*
 taskcmd.js: A simple way to manage tasks on the command line.
 */

var config = require('./src/config');
var commands = require('./src/commands');

// Get command name and parameters from command line arguments
var cmd = process.argv[2];
var params = process.argv.slice(3);

// Default to 'help' command
if (!cmd) { cmd = 'help'; }

// Initialize environment (an error will be thrown if the project has not been initialized yet)
if (cmd != 'init') {
    config.init();
}

// Run the command with specified parameters
commands.run(cmd.toLowerCase(), params);
