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

(function() {
	'use strict';

	// MEAN //

	/**
	* FUNCTION: mean( arr )
	*	Computes the arithmetic mean over an array of values.
	*
	* @param {Array} arr - array of values
	* @returns {Number} mean value
	*/
	function mean( arr ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'mean()::invalid input argument. Must provide an array.' );
		}
		var len = arr.length,
			N = 0,
			mu = 0,
			diff = 0;

		for ( var i = 0; i < len; i++ ) {
			N += 1;
			diff = arr[ i ] - mu;
			mu += diff / N;
		}
		return mu;
	} // end FUNCTION mean()


	// EXPORTS //

	module.exports = mean;

})();