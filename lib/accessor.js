'use strict';

/**
* FUNCTION: mean( arr, clbk )
*	Computes the arithmetic mean of an array using an accessor function.
*
* @param {Array} arr - input array
* @param {Function} clbk - accessor function for accessing array values
* @returns {Number|Null} arithmetic mean or null
*/
function mean( arr, clbk ) {
	var len = arr.length,
		delta,
		mu,
		i;

	if ( !len ) {
		return null;
	}
	mu = 0;
	for ( i = 0; i < len; i++ ) {
		delta = clbk( arr[ i ], i ) - mu;
		mu += delta / (i+1);
	}
	return mu;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
