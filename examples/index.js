'use strict';

var matrix = require( 'dstructs-matrix' ),
	mean = require( './../lib' );

var data,
	mat,
	mu,
	i;


// ----
// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = mean( data );
console.log( 'Arrays: %d\n', mu );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
mu = mean( data, {
	'accessor': getValue
});
console.log( 'Accessors: %d\n', mu );


// ----
// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = mean( data );
console.log( mu );


// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
mu = mean( mat, {
	'dim': 1
});
console.log( 'Matrix (rows): %s\n', mu.toString() );


// ----
// Matrices (along columns)...
mu = mean( mat, {
	'dim': 2
});
console.log( 'Matrix (columns): %s\n', mu.toString() );


// ----
// Matrices (custom output data type)...
mu = mean( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', mu.dtype, mu.toString() );
