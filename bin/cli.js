#!/usr/bin/env node
'use strict';

// MODULES //

var parseArgs = require( 'minimist' ),
	byline = require( 'byline' ),
	mean = require( './../lib/stream.js' );


// ARGUMENTS //

var opts,
	args;

opts = {
	'string': [
		'encoding'
	],
	'boolean': [
		'objectMode',
		'decodeStrings',
		'allowHalfOpen'
	],
	'default': {
		'encoding': null, // default: null --> buffer
		'allowHalfOpen': false, // default: true
		'highWaterMark': 16, // default: 16kb
		'objectMode': false, // default: false
		'decodeStrings': false // default: true
	}
};

args = parseArgs( process.argv.slice( 2 ), opts );


// STDIN STREAM //

var stream = mean( args );

process.stdin
	.pipe( new byline.LineStream() )
	.pipe( stream );

