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

  // Fix dates
  if (arguments[0].date && arguments[0].date !== 'today') {
    arguments[0].date = new Date (arguments[0].date).toISOString().split ('T')[0];
  }

  if (arguments[0].localtime) {
    arguments[0].localtime = new Date (arguments[0].localtime).toISOString();
  }

  if (arguments[0].start && typeof arguments[0].start !== 'number') {
    arguments[0].start = Math.floor (new Date (arguments[0].start).getTime() / 1000);
  }

  // Process request
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

  const res = await doRequest (options);
  const data = JSON.parse (res.body);

  // API error
  if (data.error) {
    throw new Error (data.error);
  }

  // Success
  return data;
};
