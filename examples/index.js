'use strict';

var mean = require( './../lib' );

// Simulate some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
// Calculate the mean...
console.log( mean( data ) );
