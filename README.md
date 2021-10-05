# worldtides

API wrapper for [WorldTides.info](https://www.worldtides.info) on [Node.js](https://nodejs.org) (unofficial)

[![npm](https://img.shields.io/npm/v/worldtides.svg?maxAge=3600)](https://github.com/fvdm/nodejs-worldtides/blob/master/CHANGELOG.md)
[![Build Status](https://github.com/fvdm/nodejs-worldtides/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/fvdm/nodejs-worldtides/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-worldtides/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-worldtides?branch=master)


## Usage

You provide the parameters in an _object_ and it returns a _Promise_.

When a parameter only needs to be 'present' you still need to give it a value,
like an empty string `''` or `true`, it can be anything.

The `date`, `localtime` and `start` params are auto formatted from strings and Date.

See the [**API documentation**](https://www.worldtides.info/apidocs) for details.


```js
const tides = require ('worldtides');

// Get tide extremes for the next 2 weeks (3 credits)
tides ({
  key: 'abc123',
  extremes: '',
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
.catch (console.error);
```


## Installation

`npm i worldtides`


## Configuration

You can add the configuration params in the same arguments
object as the API request method.

```js
const tides = require ('worldtides') ({
  key: 'abc123',
  timeout: 5000,
});
```

### Parameters

param     | type   | default     | description
:---------|:-------|:------------|:-----------
key       | string |             | API key
[origin]  | string | `no-origin` | Origin on allow list
[timeout] | number | `5000`      | Request time out in ms


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

For more information, please refer to <https://unlicense.org>


## Author

[Franklin](https://fvdm.com)
| [Buy me a coffee](https://fvdm.com/donating)
