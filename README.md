build-friend
============

a task runner and a build system

Documentation
============

###installing buildfriend cli

npm install -g build-friend (i haven't yet published the module).

if you want to install from github run the below command,

```javascript

npm install -g git+https://github.com/Prashanth-Nelli/build-friend.git

```

you should have git installed in ur system.

###Sample buildfriend.js 

This file is just a quick sample to give you a taste of what build-friend does.

```javascript

var buildfriend = require('build-friend');

var gulp = require('gulp');

buildfriend.task('run',['t1','t2'],function() {
	return{
		console.log('run task is done');
	} 
});

buildfriend.task('t1',function() {
	return {
		console.log('t1 task is done');
	}
});


buildfriend.task('t2',function() {
	return{
		 console.log('t2 task is done');
	}
});

buildfriend.task('copy',function(){
	return gulp.src('./**/*.*').pipe(gulp.dest('./copy'));
});

buildfriend.task('copy2',['copy'],function(){
	return gulp.src('./copy/**/**/*.*').pipe(gulp.dest('./copy2'));
});


```
###Task dependencies execution

if task1 depends on task2 u should create task like this

```javascript

/* 
 * you should return some value otherwise buildfriend doesn't know when the task is completed
 * ,because of that depedencies may run in parallel with actual task,so to avoid that you should 
 *  return a value
 *
 */

buildfriend.task('task1',['task2],function(){

	return {
		//task code
	}

});

```

### Running tasks 

```javascript

                buildfriend taskname;
                buildfriend t1;
                
```

### plugin's and other features

Right now buildfriend doesn't have plugins specific to it but you can you gulp plugins 

as shown in the sample buildfriend.js file and there are seperate node modules for

providing minifying,compressing,jshint,copying,deleting features you can use them along with

buildfriend.

### Note

you have to use ```javascript require('build-friend') ``` to use buildfriend

you should create you tasks in buildfriend.js file 

you should run your task using 
	
	```javascript buildfriend taskname ```

not the following

	```javascript build-friend taskname ```

###Features Planned

* adding watch feature to buildfriend
* plugins support

