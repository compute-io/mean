'use strict';

/**
* FUNCTION: mean( out, mat[, dim] )
*	Computes the arithmetic mean along a matrix dimension.
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Number} [dim=2] - matrix dimension along which to compute an arithmetic mean. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} arithmetic means or null
*/
function mean( out, mat, dim ) {
	var delta,
		mu,
		M, N,
		s0, s1,
		o,
		i, j, k;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}
	o = mat.offset;
	for ( i = 0; i < M; i++ ) {
		k = o + i*s0;
		mu = 0;
		for ( j = 0; j < N; j++ ) {
			delta = mat.data[ k + j*s1 ] - mu;
			mu += delta / (j+1);
		}
		out.data[ i ] = mu;
	}
	return out;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
