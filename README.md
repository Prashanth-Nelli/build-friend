build-friend
============

A task runner and a build system

[![NPM Version](https://img.shields.io/npm/v/build-friend.svg?style=flat)](https://www.npmjs.org/package/build-friend)
[![Build Status](https://img.shields.io/travis/Prashanth-Nelli/build-friend.svg?style=flat)](https://travis-ci.org/Prashanth-Nelli/build-friend)


##Documentation:


###installing build-friend cli creates a command buildfriend you can use this command to run tasks,install build-friend globally

using the following command


```bash

$ npm install -g build-friend

```

build-friend cli requires build-friend module to be installed locally,install build-friend locally using below command


```bash

$ npm install build-friend

```

###Sample build-friend.js 

This file is just a quick sample to give you a taste of what build-friend does.

```javascript

var buildfriend = require('build-friend');

var gulp = require('gulp');

buildfriend.task('run',['t1','t2'],function() {
	return console.log('run task is done');
});

buildfriend.task('t1',function() {
	return console.log('t1 task is done');
});


buildfriend.task('t2',function() {
	return console.log('t2 task is done');
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
 * you should return some value otherwise build-friend doesn't know when the task is completed
 * ,because of that depedencies may run in parallel with actual task,so to avoid that you should 
 *  return a value
 *
 */

buildfriend.task('task1',['task2'],function(){

	return (task code)

});

```

####Watching for changes and runnig tasks 

build-friend watch depends on [gaze](https://github.com/shama/gaze)

check there for the glob patterns supported by gaze 

```javascript

/*you should pass exactly three parameters the first one is glob pattern and the second parameter
*should be an array of tasks to run on change and the thrid parameter should be a function it will
*be invoked each time there is an event like file delete,change,creat...*
*/

buildfriend.watch('./**/*.js',['task1','task2'],function(event,filepath){
	console.log(event+' '+filepath);
});


/* On every event (like file creation or deletion or updation) tasks are 
*  run in a sequencial manner like task2 will run after task1's completion
*/


```

### Running tasks 

```bash

   $ buildfriend taskname;
    
```

####Example:-

```bash

   $ buildfriend t1;

```

### plugin's and other features

Right now build-friend doesn't have plugins specific to it but you can you gulp plugins 

as shown in the sample build-friend.js file and there are seperate node modules for

providing minifying,compressing,jshint,copying,deleting features you can use them along with

build-friend.

### Note

you should require ```build-friend``` 

``` require('build-friend') ``` 

to use build-friend, create your tasks in build-friend.js file 

you should run your task using 
	
```bash

   $ buildfriend taskname 
	
```

not the following

```bash
	
   $ build-friend taskname 

```

###Features Planned

   plugins support

###LICENSE
[MIT](LICENSE)
