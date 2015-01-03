/**
*
*	STREAM: mean
*
*
*	DESCRIPTION:
*		- Transform stream which computes the arithmetic mean of data piped via the command-line.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var Transform = require( 'readable-stream' ).Transform,
	mean = require( './' );


// STREAM //

/**
* FUNCTION: Stream()
*	Transform stream constructor.
*
* @constructor
* @returns {Stream} Transform stream
*/
function Stream() {
	if ( !( this instanceof Stream ) ) {
		return new Stream();
	}
	Transform.call( this, {} );
	this._readableState.objectMode = true;
	this._data = [];

	return this;
} // end FUNCTION Stream()

/**
* Create a prototype which inherits from the parent prototype.
*/
Stream.prototype = Object.create( Transform.prototype );

/**
* Set the constructor.
*/
Stream.prototype.constructor = Stream;

/**
* METHOD: _transform( chunk, encoding, clbk )
*	Implements the `_transform` method to accept input and produce output.
*
* @private
* @param {Buffer|String} chunk - the chunk to be transformed
* @param {String} encoding - chunk encoding
* @param {Function} clbk - callback invoking after transforming a chunk
*/
Stream.prototype._transform = function( chunk, encoding, clbk ) {
	chunk = +( chunk.toString() );
	if ( chunk === chunk ) {
		this._data.push( chunk );
	}
	clbk();
}; // end METHOD _transform()

/**
* METHOD: _flush( clbk )
*	Implements the `_flush` method to handle any remaining data.
*
* @private
* @param {Function} clbk - callback to invoke after handling remaining data
*/
Stream.prototype._flush = function( clbk ) {
	process.stdout.write( mean( this._data ).toString() );
	clbk();
}; // end METHOD _flush()


// EXPORTS //

module.exports = Stream;
