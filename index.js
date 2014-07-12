/*
 taskcmd.js: A simple way to manage tasks on the command line.
 */

var datastore = require('./src/datastore');
var commands = require('./src/commands');

// Config for TaskCmd
taskcmd = {
    env: 'development',
    datastore: '.tasks',
    db: {
        tasks: 'tasks.db',
        users: 'users.db'
    }
};

// Get command name and parameters from command line arguments
var cmd = process.argv[2];
var params = process.argv.slice(3);

// Default to 'help' command
if (!cmd) { cmd = 'help'; }

// Run the command with specified parameters
commands.run(cmd.toLowerCase(), params);
