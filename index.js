/**
 * @author Prashanth.Kumar
 */

var tasks = {};

exports = module.exports = buildfriend = {};

buildfriend.tasks = tasks;

buildfriend.task = function(name, callback) {
	tasks[name] = callback
};

buildfriend.run = function(task) {
	if (tasks.hasOwnProperty(task)) {
		tasks[task]();
	} else {
		console.warn(task + ' task not found')
	}
}

