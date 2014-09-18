#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var resolve = require('resolve');

var args = process.argv.slice(2);
var dir = process.cwd();

var filepath = path.join(dir, 'buildfriend.js');

if (fs.existsSync(filepath)) {
	try {
		var buildConfig = require(filepath);
		var buildfriend = require(resolve.sync('build-friend',{basedir:dir}));
		buildfriend.start.call(buildfriend, args[0]);
	} catch(ex) {
		console.log(ex);
	}
} else {
	console.log(chalk.red('buildfriend.js file not found in the current directory'));
}
