#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var args = process.argv.slice(2);

var dir = process.cwd();

var filepath = path.join(dir, 'buildfriend.js');

if (fs.existsSync(filepath)) {
	var buildConfig = require(filepath);
	var buildfriend = require('build-friend');
	try {
		buildfriend.start.call(buildfriend, args[0]);
	} catch(ex) {
		console.log(ex);
	}
} else {
	throw Error('buildfriend.js file not found in the current directory');
}
