describe('build-friend Test', function() {

	var buildfriend = require('../');
	var assert = require('assert');

	describe('Task Save', function() {
		it('it should properly save tasks', function() {
			
			buildfriend.task('task-1', [], function() {
				console.log('task-1 ran successfully');
			});
			
			if (!buildfriend.tasks['task-1'] && buildfriend.tasks['task-1'].deps === [] && typeof buildfriend.tasks['task-1'].cb === 'function') {
				throw Error('tasks are not saved properly');
			}
			
		});
	});

	describe('Task Dependency Test', function() {
		it('it should properly order the dependencies', function() {
			
			buildfriend.task('task-2', ['task-1'], function() {
				console.log('task-2 ran successfully');
			});
			buildfriend.walkTree('task-2', buildfriend.seq);
			assert.deepEqual(['task-1'], buildfriend.seq);
			
			buildfriend.seq = [];
			buildfriend.task('task-3', ['task-2'], function() {
				console.log('task-3 ran successfully');
			});
			buildfriend.walkTree('task-3',buildfriend.seq);
			assert.deepEqual(['task-1','task-2'],buildfriend.seq);
		});
	});

	describe('Task Run Test', function() {
		it('it should run tasks successfully', function() {
			buildfriend.start('task-1');
			buildfriend.start('task-2');
		});
	});

});
