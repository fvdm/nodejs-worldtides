/*
Source & docs:      <https://github.com/fvdm/nodejs-worldtides>
API documentation:  <https://www.worldtides.info/apidocs>
*/

/* eslint-disable */

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
