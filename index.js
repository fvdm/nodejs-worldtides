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
 * Convert a date to a string
 *
 * @param   {Date|string}  [date]  Date to convert
 * @param   {string}       type    Return a long ISO string
 *
 * @return  {string}
 */

async function fixDate (date, type) {
  let str;

  if (!date) {
    return '';
  }

  if (date === 'today') {
    return date;
  }

  if (typeof date === 'string') {
    date = new Date (date);
  }

  switch (type) {
    case 'unix':
      str = Math.floor (date.getTime() / 1000);
      break;

    case 'long':
      str = date.toISOString();
      break;

    case 'short':
    default:
      str = date.toISOString().split ('T')[0];
      break;
  }

  return str;
}


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

module.exports = async function ({
  key,
  origin = 'no-origin',
  timeout = 5000,
  date = '',
  start = '',
  localtime = '',
}) {
  delete arguments[0].key;
  delete arguments[0].origin;
  delete arguments[0].timeout;

  const options = {
    url: 'https://www.worldtides.info/api/v2',
    method: 'POST',
    parameters: {
      key,
      ...arguments[0],
    },
    timeout,
    headers: {
      'Origin': origin,
      'User-Agent': 'nodejs-worldtides',
    },
  };

  options.parameters.date = fixDate (date, 'short');
  options.parameters.start = fixDate (start, 'unix');
  options.parameters.localtime = fixDate (localtime, 'long');

  const res = await doRequest (options);
  const data = JSON.parse (res.body);

  if (data.error) {
    throw new Error (data.error);
  }

  return data;
};
