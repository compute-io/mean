#!/usr/bin/env node
'use strict';

// MODULES //

var byline = require( 'byline' ),
	mean = require( './../lib/stream.js' );


// STDIN STREAM //

process.stdin
	.pipe( new byline.LineStream() )
	.pipe( mean() );

