/**
 * Name:               worldtides - index.js
 * Description:        API wrapper for WorldTides.info on Node.js (unofficial)
 * Author:             Franklin van de Meent <https://frankl.in>
 * License:            Unlicense (public domain, see LICENSE file)
 *
 * Source & docs:      <https://github.com/fvdm/nodejs-worldtides>
 * Feedback & issues:  <https://github.com/fvdm/nodejs-worldtides/issues>
 *
 * API documentation:  <https://www.worldtides.info/apidocs>
 */

const { promisify } = require ('util');
const doRequest = promisify (require ('httpreq').doRequest);

let config = {};


/**
 * Communicate with the API
 *
 * @param    {object}   parameters  Method params
 *
 * @return   {Promise}
 *
 * @Promise  {object}   resolve     Method response
 * @Promise  {error}    reject      Client or API error
 */

function talk (parameters = {}) {
  const options = {
    url: 'https://www.worldtides.info/api',
    method: 'POST',
    parameters,
    timeout: config.timeout || 5000,
    headers: {
      'Origin': config.origin || 'no-origin',
      'User-Agent': 'Node.js/worldtides',
    },
  };

  options.parameters.key = config.key;

  return new Promise ((resolve, reject) => {
    doRequest (options)
      .then (res => JSON.parse (res.body))
      .then (data => {
        let error;

        if (data.error) {
          error = new Error (data.error);
          error.statusCode = data.status;
          reject (error);
        } else {
          resolve (data);
        }
      })
      .catch (reject)
    ;
  });
}


/**
 * Module init
 *
 * @param   {object}    conf
 * @param   {string}     conf.key                 API key
 * @param   {string}     [conf.origin=no-origin]  Client origin
 * @param   {int}        [conf.timeout=5000]      Request time out in ms
 *
 * @return  {function}                            See `talk()`
 */

module.exports = (conf => {
  config = conf;
  return talk;
});
