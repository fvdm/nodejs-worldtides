# worldtides

API wrapper for [WorldTides.info](https://www.worldtides.info) on [Node.js](https://nodejs.org) (unofficial)

[![npm](https://img.shields.io/npm/v/worldtides.svg?maxAge=3600)](https://github.com/fvdm/nodejs-worldtides/blob/master/CHANGELOG.md)
[![Build Status](https://travis-ci.org/fvdm/nodejs-worldtides.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-worldtides/branches)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-worldtides/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-worldtides?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/fvdm/nodejs-worldtides.svg)](https://greenkeeper.io/)


## Example

```js
const tides = require ('worldtides') ({
  key: 'abc123',
});


// Get tide extremes for the next 2 weeks (3 credits)
tides ({
  extremes: '',
  correctedConstituents: '',
  length: 1209600,
  stationDistance: 15,
  lat: 52.381158,
  lon: 4.4837275,
})
  .then (data => {
    data.extremes.forEach (itm => {
      console.log (`${itm.date} - ${itm.type}`);
    });
  })
  .catch (console.error)
;
```


## Installation

`npm i worldtides`


## Configuration

The package exports a function where you set the config params.
It returns the communication function.

```js
const tides = require ('worldtides') ({
  key: 'abc123',
  timeout: 5000,
});
```

##### Parameters

param   | type   | required | default   | description
:-------|:-------|:---------|:----------|:-----------
key     | string | yes      |           | API key
origin  | string | no       | no-origin | Origin on allow list
timeout | int    | no       | 5000      | Request time out in ms


## Usage

The configuration function returns the function you use for communication with the API.

You provide the parameters in an `object` and it returns a `Promise`.
See the [API documentation](https://www.worldtides.info/apidocs) for details.

When a parameter only needs to be 'present' you still need to give it a value,
like an empty string `''` or `true`, it can be anything.


```js
const params = {
  extremes: '',
  stationDistance: 15,
  lat: 52.381158,
  lon: 4.4837275,
};

tides (params)
  .then (data => {
    data.extremes.forEach (itm => {
      console.log (`${itm.date} - ${itm.type}`);
    });
  })
  .catch (console.error)
;
```


## Unlicense

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>


## Author

[Franklin van de Meent](https://frankl.in)
