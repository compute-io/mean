Mean
====
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the arithmetic mean of a numeric array.


### Installation

``` bash
$ npm install compute-mean
```

### Usage

``` javascript
var mean = require( 'compute-mean' );
```

#### mean( arr[, accessor] )

Computes the arithmetic mean of a numeric `array`.

``` javascript
var data = [ 2, 4, 5, 3, 8, 2 ];

var mu = mean( data );
// returns 4
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values

``` javascript
var data = [
	{'x':2},
	{'x':4},
	{'x':5},
	{'x':3},
	{'x':8},
	{'x':2}
];

function getValue( d ) {
	return d.x;
}

var mu = mean( data, getValue );
// returns 4
```


### Examples

``` javascript
var mean = require( 'compute-mean' );

var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}

console.log( mean( data ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

### Notes

For arrays exceeding memory constraints, you are encouraged to use streams; see [flow-mean](https://github.com/flow-io/flow-mean).


---
## CLI


### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g compute-mean
```


### Usage

``` bash
Usage: compute-mean [options] [file]

Options:

  -h,   --help                 Print this message.
  -V,   --version              Print the package version.
  -enc, --encoding <encoding>  Set the string encoding of chunks. Default: 
                               null.
  -hwm, --highwatermark        Specify how much data can be buffered into
                               memory before applying back pressure. Default:
                               16kb.
  -nho, --no-halfopen          Close the stream when the writable stream ends.
                               Default: false.
  -nds, --no-decodestrings     Prevent strings from being converted into
                               buffers before streaming to destination.
                               Default: false.
  -om,  --objectmode           Stream individual objects rather than buffers.
                               Default: false.
  -d,   --delimiter            Specify how data values are delimited. Default:
                               '\n'.
```

The `compute-mean` command is available as a [standard stream](http://en.wikipedia.org/wiki/Pipeline_%28Unix%29).

``` bash
$ <stdout> | compute-mean | <stdin>
``` 


### Examples

``` bash
$ echo $'2\n4\n5\n3\n8\n2' | compute-mean | awk '{print "mean: "$1}'
```

For local installations, modify the above command to point to the local installation directory; e.g., 

``` bash
$ echo $'2\n4\n5\n3\n8\n2' | ./node_modules/.bin/compute-mean | awk '{print "mean: "$1}'
```

To read from an example data file, navigate to the top-level module directory and run

``` bash
$ compute-mean ./examples/cli.txt | awk '{print "mean: "$1}'
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

Copyright &copy; 2014. Athan Reines.



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
