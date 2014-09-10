/**
 * @author Prashanth.Kumar
 */

var tasks = {};
var taskSequence = [];

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
	}

};

buildfriend.run = function(task) {
	if(tasks.hasOwnProperty(task)){
		tasks[task].cb();
	}else{
		console.log('task '+task+' Not found');
	}
};
