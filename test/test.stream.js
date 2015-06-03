/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Transform stream class:
	Transform = require( 'readable-stream' ).Transform,

	// Mock writing to a stream:
	mockWrite = require( 'flow-mock-write' ),

	// Mock reading from a stream:
	mockRead = require( 'flow-mock-read' ),

	// Module to be tested:
	stream = require( './../lib/stream.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'stream', function tests() {

	it( 'should export a function', function test() {
		expect( stream ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a bad option', function test() {
		expect( foo ).to.throw( TypeError );

		function foo() {
			stream({ 'objectMode': [] });
		}
	});

	it( 'should return a transform stream', function test() {
		var opts = {
				'encoding': 'utf8',
				'objectMode': true,
				'highWaterMark': 16,
				'allowHalfOpen': true,
				'decodeStrings': false
			};
		assert.instanceOf( stream( opts ), Transform );
	});

	it( 'should compute the arithmetic mean of streamed data values', function test( done ) {
		var data = [ 2, 4, 5, 3, 8, 2 ],
			expected = 4,
			s;

		s = stream({
			'objectMode': true
		});

		mockRead( s, onData );
		mockWrite( data, s );

		function onData( error, actual ) {
			if ( error ) {
				assert.notOk( true );
				return;
			}
			assert.strictEqual( actual[ 0 ],expected );
			done();
		}
	});

});
