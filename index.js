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
 * @param   {string}  params.key                 API key
 * @param   {string}  [params.origin=no-origin]  CORS origin
 * @param   {number}  [params.timeout=5000]      Request timeout in ms
 *
 * @return  {Promise<object>}
 */

module.exports = async function talk ({
  key,
  origin = 'no-origin',
  timeout = 5000,
}) {
  delete arguments[0].origin;
  delete arguments[0].timeout;

  const options = {
    url: 'https://www.worldtides.info/api',
    method: 'POST',
    parameters: arguments[0],
    timeout,
    headers: {
      'Origin': origin,
      'User-Agent': 'Node.js/worldtides',
    },
  };

  const res = await doRequest (options);
  const data = JSON.parse (res.body);

  if (data.error) {
    throw new Error (data.error);
  }

  return data;
};
