Mean
====
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [arithmetic mean](http://en.wikipedia.org/wiki/Arithmetic_mean).

The [arithmetic mean](http://en.wikipedia.org/wiki/Arithmetic_mean) is defined as

<div class="equation" align="center" data-raw-text="\mu = \frac{1}{N} \sum_{i=0}^{N-1} x_i" data-equation="eq:arithmetic_mean">
	<img src="https://cdn.rawgit.com/compute-io/mean/c98aa32b6fea5b040092dbf950cba79eb25e25b8/docs/img/eqn.svg" alt="Equation for the arithmetic mean.">
	<br>
</div>

where `x_0, x_1,...,x_{N-1}` are individual data values and `N` is the total number of values in the data set.


## Installation

``` bash
$ npm install compute-mean
```

## Usage

``` javascript
var mean = require( 'compute-mean' );
```

#### mean( x[, opts] )

Computes the [arithmetic mean](http://en.wikipedia.org/wiki/Arithmetic_mean). `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, mu;

data = [ 2, 4, 5, 3, 8, 2 ];
mu = mean( data );
// returns 4

data = new Int8Array( data );
mu = mean( data );
// returns 4
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':2},
	{'x':4},
	{'x':5},
	{'x':3},
	{'x':8},
	{'x':2}
];

function getValue( d, i ) {
	return d.x;
}

var mu = mean( data, {
	'accessor': getValue
});
// returns 4
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following `options`:

*	__dim__: dimension along which to compute the [arithmetic mean](http://en.wikipedia.org/wiki/Arithmetic_mean). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [arithmetic mean](http://en.wikipedia.org/wiki/Arithmetic_mean) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	mu,
	i;

data = new Int8Array( 25 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [5,5], 'int8' );
/*
	[  0  1  2  3  4
	   5  6  7  8  9
	  10 11 12 13 14
	  15 16 17 18 19
	  20 21 22 23 24 ]
*/

mu = mean( mat );
/*
	[  2
	   7
	  12
	  17
	  22 ]
*/
```

To compute the [arithmetic mean](http://en.wikipedia.org/wiki/Arithmetic_mean) along the rows, set the `dim` option to `1`.

``` javascript
mu = mean( mat, {
	'dim': 1
});
/*
	[ 10, 11, 12, 13, 14 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
mu = mean( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 10, 11, 12, 13, 14 ]
*/

var dtype = mu.dtype;
// returns 'uint8'
```

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 2, 4, 5, 3, 8, 2 ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,6], 'int8' );
mu = mean( mat );
// returns 4

// Column vector:
mat = matrix( new Int8Array( data ), [6,1], 'int8' );
mu = mean( mat );
// returns 4
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
mu = mean( [] );
// returns null

mu = mean( new Int8Array( [] ) );
// returns null

mu = mean( matrix( [0,0] ) );
// returns null

mu = mean( matrix( [0,10] ) );
// returns null

mu = mean( matrix( [10,0] ) );
// returns null
```



## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mean = require( 'compute-mean' );

var data,
	mat,
	mu,
	i;

// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = mean( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = { 'x': data[ i ] };
}
mu = mean( data, {
	'accessor': getValue
});

// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = mean( data );

// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
mu = mean( mat, {
	'dim': 1
});

// Matrices (along columns)...
mu = mean( mat, {
	'dim': 2
});

// Matrices (custom output data type)...
mu = mean( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.



[npm-image]: http://img.shields.io/npm/v/compute-mean.svg
[npm-url]: https://npmjs.org/package/compute-mean

[travis-image]: http://img.shields.io/travis/compute-io/mean/master.svg
[travis-url]: https://travis-ci.org/compute-io/mean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/mean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/mean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/mean.svg
[dependencies-url]: https://david-dm.org/compute-io/mean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/mean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/mean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/mean.svg
[github-issues-url]: https://github.com/compute-io/mean/issues
