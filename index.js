/**
 * @author Prashanth.Kumar
 */

var Gaze = require('gaze').Gaze;

var tasks = {};
var seq = [];

exports = module.exports = buildfriend = {};

buildfriend.tasks = tasks;

buildfriend.task = function(name, callback) {
	var args = [], length = 0;

	for (var i = 0; i < arguments.length; i++) {
		args[i] = arguments[i];
	}

	length = args.length;

	switch(length) {
	case 0:
		throw Error('task method requires at least two parameters');
		break;
	case 1:
		throw Error('task method requires at least two parameters');
		break;
	case 2:
		tasks[name] = {
			cb : callback,
			deps : []
		};
		break;
	case 3:
		if ( typeof args[0] !== 'string') {
			throw Error('task should be a string');
		}
		if ( typeof args[1] == 'object' && typeof args[2] == 'function' && typeof args[1].length !== 'undefined') {
			tasks[args[0]] = {
				cb : args[2],
				deps : []
			};
			for (var i = 0; i < args[1].length; i++) {
				tasks[args[0]].deps[i] = args[1][i];
			}
		} else {
			throw Error('Give proper parameters to task method');
		}
		break;
	default:
		throw Error('Give proper parameters to task method');
	}

};

buildfriend.watch = function(glob, tasklist, cbFunction) {

	if ( typeof glob == 'string' && typeof tasklist == 'object' && typeof cbFunction == 'function' && tasklist.length >= 0) {
		buildfriend.task('watch', tasklist, function() {
			var gaze = new Gaze(glob);
			gaze.on('all',function(event, path) {
				buildfriend.start('watch');
				cbFunction(event, path);
			});
		});
	} else {
		throw Error('Pass proper parameters to watch function');
	}

}

buildfriend.start = function(task) {
	if (tasks.hasOwnProperty(task)) {
		walkTree(task);
		if (!(tasks[task].deps.length === 0)) {
			seq.push(task);
		}
		run(seq)();
	} else {
		console.log('task ' + task + ' Not found');
	}
};

function walkTree(task) {
	if (tasks[task].deps.length === 0) {
		seq.push(task);
		if (seq.length > 1) {
			var swap = seq[seq.length - 1];
			seq[seq.length - 1] = seq[seq.length - 2];
			seq[seq.length - 2] = swap;
		}
		return task;
	} else {
		for (var i = 0; i < tasks[task].deps.length; ++i) {
			if (tasks[tasks[task].deps[i]].deps.length > 0) {
				seq.push(tasks[task].deps[i]);
			}
			walkTree(tasks[task].deps[i]);
		}
	}
}

function run(taskArray) {

	var i = -1, length = taskArray.length;

	function start() {++i;
		if (i < length) {
			var rTask = tasks[taskArray[i]].cb();
			if ( typeof rTask == 'object') {
				if ( typeof rTask.on == 'function' && typeof rTask.resume == 'function') {
					rTask.resume();
					rTask.on('end', function() {
						start();
					});
				} else {
					start();
				}
			} else {
				start();
			}
		}
	}

	return start;
}

