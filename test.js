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
    data = await app ({ ...config, ...params });
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
    .isError ('fail', 'err', error)
    .isNotEmpty ('fail', 'err.message', error && error.message)
    .isUndefined ('fail', 'data', data)
    .done()
  ;
});


dotest.add ('date: today', async test => {
  let error;
  let data;

  try {
    data = await app ({
      ...config,
      ...params,
      date: 'today',
    });
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


dotest.add ('date: string', async test => {
  let error;
  let data;

  try {
    data = await app ({
      ...config,
      ...params,
      date: '2021-10-01 12:34',
    });
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


dotest.add ('localtime', async test => {
  let error;
  let data;

  try {
    data = await app ({
      ...config,
      ...params,
      localtime: new Date().toString(),
    });
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


dotest.add ('start: number', async test => {
  let error;
  let data;

  try {
    data = await app ({
      ...config,
      ...params,
      start: Math.floor (new Date().getTime() / 1000) - 86400,
    });
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


dotest.add ('start: date', async test => {
  let error;
  let data;

  try {
    data = await app ({
      ...config,
      ...params,
      start: new Date(),
    });
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


dotest.run ();
