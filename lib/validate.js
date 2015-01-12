/**
*
*	VALIDATE: options
*
*
*	DESCRIPTION:
*		- Validates transform stream options.
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

var isObject = require( 'validate.io-object' );


// VARIABLES //

var validators = {
	'encoding': encoding,
	'allowHalfOpen': allowHalfOpen,
	'highWaterMark': highWaterMark,
	'objectMode': objectMode,
	'decodeStrings': decodeStrings,
	'delimiter': delimiter
};


// FUNCTIONS //

/**
* FUNCTION: validate( options )
*	Validates stream options.
*
* @private
* @param {Object} options - Readable stream options
* @returns {Null|TypeError} null if valid or TypeError if invalid
*/
function validate( options ) {
	var validator,
		keys,
		key,
		err;

	if ( !isObject( options ) ) {
		return new TypeError( 'mean()::invalid input argument. Options must be an object.' );
	}
	keys = Object.keys( options );
	for ( var i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		validator = validators[ key ];
		err = validator( options[key] );
		if ( err ) {
			return err;
		}
	}
} // end FUNCTION validate()

/**
* FUNCTION: encoding( value )
*	Validates the stream encoding option.
*
* @private
* @param {String|Null} value - stream encoding
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function encoding( value ) {
	if ( typeof value !== 'string' && value !== null ) {
		return new TypeError( 'mean()::invalid input argument. Encoding must be a string or null.' );
	}
	return null;
} // end FUNCTION encoding()

/**
* FUNCTION: allowHalfOpen( value )
*	Validates the stream `allowHalfOpen` option.
*
* @private
* @param {String|Null} value - stream option value
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function allowHalfOpen( value ) {
	if ( typeof value !== 'boolean' ) {
		return new TypeError( 'mean()::invalid input argument. allowHalfOpen must be a boolean.' );
	}
	return null;
} // end FUNCTION allowHalfOpen()

/**
* FUNCTION: highWaterMark( value )
*	Validates the stream high watermark option.
*
* @private
* @param {Number} value - stream high watermark
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function highWaterMark( value ) {
	if ( typeof value !== 'number' || value !== value || value < 0 ) {
		return new TypeError( 'mean()::invalid input argument. High watermark must be numeric and greater than 0.' );
	}
	return null;
} // end FUNCTION highWaterMark()

/**
* FUNCTION: objectMode( value )
*	Validates the stream objectMode option.
*
* @private
* @param {Boolean} value - stream objectMode option
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function objectMode( value ) {
	if ( typeof value !== 'boolean' ) {
		return new TypeError( 'mean()::invalid input argument. objectMode must be a boolean.' );
	}
	return null;
} // end FUNCTION objectMode()

/**
* FUNCTION: decodeStrings( value )
*	Validates the stream decodeStrings option.
*
* @private
* @param {String} value - decodeStrings option
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function decodeStrings( value ) {
	if ( typeof value !== 'boolean' ) {
		return new TypeError( 'mean()::invalid input argument. decodeStrings must be a boolean.' );
	}
	return null;
} // end FUNCTION decodeStrings()

/**
* FUNCTION: delimiter( value )
*	Validates the delimiter option.
*
* @private
* @param {String} value - datum delimiter
* @return {Null|TypeError} null if valid or TypeError if invalid
*/
function delimiter( value ) {
	if ( typeof value !== 'string' ) {
		return new TypeError( 'mean()::invalid input argument. Delimiter must be a string' );
	}
	return null;
} // end FUNCTION delimiter()


// EXPORTS //

module.exports = validate;
