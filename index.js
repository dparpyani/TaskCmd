/*
 taskcmd.js: A simple way to manage tasks on the command line.
 */

var config = require('./src/config');
var commands = require('./src/commands');
var LocalStorage = require('./src/storage/local');
var output = require('./src/output');
var storage = new LocalStorage('.taskcmd', 'tasks.db');

// Get command name and parameters from command line arguments
var cmd = process.argv[2];
var params = process.argv.slice(3);

// Default to 'help' command
if (!cmd) { cmd = 'help'; }

// Run command
commands.run(cmd.toLowerCase(), params, storage);
