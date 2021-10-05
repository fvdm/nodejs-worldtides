/**
 * Name:               worldtides - index.js
 * Description:        API wrapper for WorldTides.info on Node.js (unofficial)
 * Author:             Franklin <https://fvdm.com>
 * License:            Unlicense (public domain, see LICENSE file)
 * Source & docs:      <https://github.com/fvdm/nodejs-worldtides>
 * API documentation:  <https://www.worldtides.info/apidocs>
 */

const { doRequest } = require ('httpreq');


/**
 * Convert dates to formatted strings
 *
 * @param   {object}  p  Request parameters
 *
 * @return  {string}
 */

async function fixDates (p) {
  if (p.date && p.date !== 'today') {
    p.date = new Date (p.date).toISOString().split ('T')[0];
  }

  if (p.localtime) {
    p.localtime = new Date (p.localtime).toISOString();
  }

  if (p.start && typeof p.start !== 'number') {
    p.start = Math.floor (new Date (p.start).getTime() / 1000);
  }

  return p;
}


/**
 * Communicate with the API
 *
 * @param   {object}  params                     Method parameters
 * @param   {string}  [params.origin=no-origin]  CORS origin
 * @param   {number}  [params.timeout=5000]      Request timeout in ms
 *
 * @return  {Promise<object>}
 */

module.exports = async function ({
  origin = 'no-origin',
  timeout = 5000,
}) {
  delete arguments[0].origin;
  delete arguments[0].timeout;

  const options = {
    url: 'https://www.worldtides.info/api/v2',
    method: 'POST',
    parameters: arguments[0],
    timeout,
    headers: {
      'Origin': origin,
      'User-Agent': 'nodejs-worldtides',
    },
  };

  options.parameters = await fixDates (options.parameters);

  const res = await doRequest (options);
  const data = JSON.parse (res.body);

  if (data.error) {
    throw new Error (data.error);
  }

  return data;
};
