#!/usr/bin/env node
'use strict';

// MODULES //

var mean = require( './../lib' );


// STDIN //

var stdin = process.stdin;

stdin.setEncoding( 'utf8' );
stdin.on( 'readable', onReadable );
stdin.on( 'end', onEnd );


// DATA //

var data = [];


// FUNCTIONS //

/**
* FUNCTION: onReadable()
*	Processes data received from the input stream.
*/
function onReadable() {
	var chunk = stdin.read();
	if ( chunk !== null ) {
		console.log( 'read: ', chunk );
		data.push( parseFloat( chunk ) );
	}
} // end FUNCTION onReadable()

/**
* FUNCTION: onEnd()
*	Computes the arithmetic mean of streamed data.
*/
function onEnd() {
	console.log( 'end: ', data );
	process.stdout.write( mean( data ).toString() );
} // end FUNCTION onEnd()


