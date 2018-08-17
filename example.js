/**
 * Name:               worldtides - example.js
 * Description:        Example on how to use the worldtides package
 * Author:             Franklin van de Meent <https://frankl.in>
 * License:            Unlicense (public domain, see LICENSE file)
 *
 * Source & docs:      <https://github.com/fvdm/nodejs-worldtides>
 * Feedback & issues:  <https://github.com/fvdm/nodejs-worldtides/issues>
 *
 * API documentation:  <https://www.worldtides.info/apidocs>
 */

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
