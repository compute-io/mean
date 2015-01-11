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
		'allowHalfOpen',
		'help',
		'version'
	],
	'alias': {
		'encoding': [
			'enc'
		],
		'allowHalfOpen': [
			'aho'
		],
		'highWaterMark': [
			'hwm'
		],
		'objectMode': [
			'om'
		],
		'decodeStrings': [
			'ds'
		],
		'help': [
			'h'
		],
		'version': [
			'V'
		]
	},
	'default': {
		'encoding': null, // default: null --> buffer
		'allowHalfOpen': false, // default: true
		'highWaterMark': 16, // default: 16kb
		'objectMode': false, // default: false
		'decodeStrings': false, // default: true

		'help': false,
		'version': false
	}
};

args = parseArgs( process.argv.slice( 2 ), opts );


// HELP //

if ( args.help ) {

}


// VERSION //

if ( args.version ) {

}


// STDIN STREAM //

var stream = mean( args );

process.stdin
	.pipe( new byline.LineStream() )
	.pipe( stream );

