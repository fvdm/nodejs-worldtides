const dotest = require ('dotest');
const app = require ('./');

const config = {
  key: process.env.KEY || '',
  origin: process.env.ORIGIN || '',
  timeout: process.env.TIMEOUT || '',
};

const params = {
  extremes: '',
  stationDistance: 15,
  lat: 52.381158,
  lon: 4.4837275,
};

const combined = {
  ...config,
  ...params,
};


dotest.add ('Interface', test => {
  test()
    .isFunction ('fail', 'exports', app)
    .done()
  ;
});


dotest.add ('Communication', async test => {
  let error;
  let data;

  try {
    data = await app (combined);
  }
  catch (err) {
    error = err;
  }

  test (error)
    .isObject ('fail', 'data', data)
    .isNotEmpty ('fail', 'data', data)
    .done()
  ;
});


dotest.add ('API error', async test => {
  let error;
  let data;

  try {
    data = await app (params);
  }
  catch (err) {
    error = err;
  }

  test()
    .isError ('fail', 'err', err)
    .isNotEmpty ('fail', 'err.message', err && err.message)
    .isUndefined ('fail', 'data', data)
    .done()
  ;
});


dotest.run ();
