/**
 * @author Prashanth.Kumar
 */

var Gaze = require('gaze').Gaze;
var chalk = require('chalk');

var tasks = {};

exports = module.exports = buildfriend = {};

buildfriend.tasks = tasks;
buildfriend.seq = [];

buildfriend.task = function(name, callback) {
	var args = [].slice.call(arguments, 0);
	switch(args.length) {
	case 0:
		console.log(chalk.red('task method requires at least two parameters'));
		break;
	case 1:
		console.log(chalk.red('task method requires at least two parameters'));
		break;
	case 2:
		tasks[name] = {
			cb : callback,
			deps : []
		};
		break;
	case 3:
		if ( typeof args[0] !== 'string') {
			console.log(chalk.red('task name should be a string'));
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
			console.log(chalk.red('Give proper parameters to task method'));
		}
		break;
	default:
		console.log(chalk.red('Give proper parameters to task method'));
	}

};

buildfriend.watch = function(glob, tasklist, cbFunction) {
	buildfriend.task('watch', tasklist, function() {
		fileWatcher()(cbFunction, tasklist, glob);
	});
};

buildfriend.start = function(task) {
	buildfriend.seq = [];
	if (tasks.hasOwnProperty(task)) {
		this.walkTree(task, buildfriend.seq);
		if (!(tasks[task].deps.length === 0)) {
			buildfriend.seq.push(task);
		}
		run(buildfriend.seq)();
	} else {
		console.log(chalk.red('task ' + task + ' Not found'));
	}
};

buildfriend.walkTree = function(task, seq) {
	console.log(task);
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
			this.walkTree(tasks[task].deps[i], seq);
		}
	}
}
function run(taskArray) {
	var i = -1, length = taskArray.length;
	function start() {++i;
		if (i < length) {
			console.time(chalk.green(taskArray[i] + ' task completed in '));
			var rTask = tasks[taskArray[i]].cb();
			if ( typeof rTask == 'object') {
				if ( typeof rTask.on == 'function' && typeof rTask.resume == 'function') {
					rTask.resume();
					rTask.on('end', function() {
						console.timeEnd(chalk.green(taskArray[i] + ' task completed in '));
						start();
					});
				} else {
					console.timeEnd(chalk.green(taskArray[i] + ' task completed in '));
					start();
				}
			} else {
				console.timeEnd(chalk.green(taskArray[i] + ' task completed in '));
				start();
			}
		}
	}

	return start;
}

function fileWatcher() {
	function watchdog(cbFunction, tasklist, glob) {
		if ( typeof glob == 'string' && typeof tasklist == 'object' && typeof cbFunction == 'function' && tasklist.length >= 0) {
			var gaze = new Gaze(glob);
			gaze.on('changed', function(filepath) {
				if (filepath.charAt(filepath.length - 1) !== '~') {
					gaze.close();
					buildfriend.start('watch');
					cbFunction('changed', filepath);
				}
			});
			gaze.on('added', function(filepath) {
				if (filepath.charAt(filepath.length - 1) !== '~') {
					gaze.close();
					buildfriend.start('watch');
					cbFunction('added', filepath);
				}
			});
			gaze.on('deleted', function(filepath) {
				if (filepath.charAt(filepath.length - 1) !== '~') {
					gaze.close();
					buildfriend.start('watch');
					cbFunction('deleted', filepath);
				}
			});
			gaze.on('error', function(error) {
				gaze.close();
				console.log(chalk.red(error.errno));
			});

		} else {
			console.log(chalk.red('Pass proper parameters to watch function'));
		}
	}

	return watchdog;
}
