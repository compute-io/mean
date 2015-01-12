#!/usr/bin/env node
'use strict';

// MODULES //

var fs = require( 'fs' ),
	path = require( 'path' ),
	parseArgs = require( 'minimist' ),
	byline = require( 'byline' ),
	mean = require( './../lib/stream.js' );


// INIT //

process.stdout.on( 'error', process.exit );


// ARGUMENTS //

var opts,
	args;

opts = {
	'string': [
		'encoding',
		'separator'
	],
	'boolean': [
		'help',
		'version',
		'no-decodestrings',
		'no-allowhalfopen',
		'objectmode'
	],
	'alias': {
		'help': [
			'h'
		],
		'version': [
			'V'
		],
		'encoding': [
			'enc'
		],
		'no-decodestrings': [
			'nd'
		],
		'no-allowhalfopen': [
			'na'
		],
		'highwatermark': [
			'hwm'
		],
		'objectmode': [
			'om'
		],
		'separator': [
			'sep'
		]
	}
};

args = parseArgs( process.argv.slice( 2 ), opts );


// HELP //

function onClose() {
	process.exit( 1 );
}

if ( args.help ) {
	fs.createReadStream( path.join( __dirname, 'usage.txt' ) )
		.pipe( process.stdout )
		.on( 'close', onClose );
    return;
}


// VERSION //

if ( args.version ) {
	console.log( require( '../package.json' ).version );
	return;
}


// STREAM //

opts = {};

// encoding: (default: null)
if ( args.hasOwnProperty( 'encoding' ) ) {
	opts.encoding = args.encoding;
}
// allowHalfOpen: (default: true)
if ( args[ 'no-allowhalfopen' ] ) {
	opts.allowHalfOpen = false;
}
// highWaterMark: (default: 16kb)
if ( args.hasOwnProperty( 'highwatermark' ) ) {
	opts.highWaterMark = args.highwatermark;
}
// decodeStrings: (default: true)
if ( args[ 'no-decodestrings' ] ) {
	opts.decodeStrings = false;
}
// objectMode: (default: false)
if ( args[ 'objectmode' ] ) {
	opts.objectMode = true;
}

// separator: (default: '\n' )
var dStream;
if ( args.hasOwnProperty( 'separator' ) ) {
	// TODO: create a split stream
} else {
	dStream = new byline.LineStream(); // TODO: replace
}

// File: (default: stdin)
var iStream;
if ( args._.length ) {
	iStream = fs.createReadStream( args._[ 0 ] );
} else {
	iStream = process.stdin;
}

iStream
	.pipe( dStream )
	.pipe( mean( opts ) );

