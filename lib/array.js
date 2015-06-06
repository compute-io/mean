'use strict';

/**
* FUNCTION: mean( arr )
*	Computes the arithmetic mean of a numeric array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number|Null} arithmetic mean or null
*/
function mean( arr ) {
	var len = arr.length,
		delta,
		mu,
		i;

	if ( !len ) {
		return null;
	}
	mu = 0;
	for ( i = 0; i < len; i++ ) {
		delta = arr[ i ] - mu;
		mu += delta / (i+1);
	}
	return mu;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
