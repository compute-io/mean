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
		'delimiter'
	],
	'boolean': [
		'help',
		'version',
		'no-decodestrings',
		'no-halfopen',
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
			'nds'
		],
		'no-halfopen': [
			'nho'
		],
		'highwatermark': [
			'hwm'
		],
		'objectmode': [
			'om'
		],
		'delimiter': [
			'd'
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
if ( args[ 'no-halfopen' ] ) {
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

// delimiter: (default: '\n' )
var delimiter = '\n',
	dStream;

if ( args.hasOwnProperty( 'delimiter' ) ) {
	delimiter = args.delimiter;
}
// TODO: replace with streams2 split stream
dStream = new byline.LineStream();

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

