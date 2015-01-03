/**
*
*	COMPUTE: mean
*
*
*	DESCRIPTION:
*		- Computes the arithmetic mean over an array of values.
*
*
*	NOTES:
*		[1] Based on Welford's method. http://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Incremental_algorithm
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

// MEAN //

/**
* FUNCTION: mean( arr[, accessor] )
*	Computes the arithmetic mean of a numeric array.
*
* @param {Array} arr - array of values
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number} mean value
*/
function mean( arr, clbk ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'mean()::invalid input argument. Must provide an array.' );
	}
	if ( arguments.length > 1 ) {
		if ( typeof clbk !== 'function' ) {
			throw new TypeError( 'mean()::invalid input argument. Accessor must be a function.' );
		}
	}
	var len = arr.length,
		N = 0,
		mu = 0,
		diff = 0,
		i;

	if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			N += 1;
			diff = clbk( arr[i] ) - mu;
			mu += diff / N;
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			N += 1;
			diff = arr[ i ] - mu;
			mu += diff / N;
		}
	}
	return mu;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
