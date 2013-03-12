/*
  taskIO.js: Manages input/output related to storing and retrieving tasks.
*/

var fs = require('fs');
var feedback = require('./feedback');
var filePath = require('path');

// Loads the saved tasks.
module.exports.getTasks = function () {
  var tasks = new Array();

  if (fs.existsSync(taskFile)) {
    tasks = JSON.parse(fs.readFileSync(taskFile, 'utf8'));
  } else {
    feedback.message('Creating task file in the current directory.');

    fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 4) , 'utf8', function (err) {
      if (err) { feedback.error(err.message); }
    });
  }
  
  return tasks;
};

// Saves the tasks.
module.exports.saveTasks = function (tasks) {
  if (tasks) {
    fs.writeFileSync(taskFile, JSON.stringify(tasks, null, 4), 'utf8', function (err) {
      if (err) { feedback.error(err.message); }
    });
  }
};

// Traverse up the directory tree looking for a .tasks.json file
module.exports.findTaskFile = function (path, prev) {
   if (filePath.join(path) == filePath.join(prev)) {
      feedback.message('No task file found.');
      return cwd;
   }
   else return (fs.existsSync(filePath.join(path, taskFileName))) ? path :
     module.exports.findTaskFile(filePath.join(path, '..'), path);
};
