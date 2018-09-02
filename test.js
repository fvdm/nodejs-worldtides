const dotest = require ('dotest');
const pkg = require ('./');

const config = {
  key: String (process.env.key),
  origin: String (process.env.origin),
  timeout: parseInt (process.env.timeout, 10),
};

const params = {
  extremes: '',
  stationDistance: 15,
  lat: 52.381158,
  lon: 4.4837275,
};

const app = pkg && pkg (config);


dotest.add ('Interface', test => {
  test()
    .isFunction ('fail', 'pkg', pkg)
    .isFunction ('fail', 'app', app)
    .done()
  ;
});


dotest.add ('Communication', test => {
  app (params)
    .then (test.info)
    .then (data => {
      test()
        .isObject ('fail', 'data', data)
        .isUndefined ('fail', 'data.error', data && data.error)
        .isArray ('fail', 'data.extremes', data && data.extremes)
        .isNotEmpty ('fail', 'data.extremes', data && data.extremes)
        .done()
      ;
    })
    .catch (test)
  ;
});


dotest.add ('Error handling: API error', test => {
  app ({})
    .then (data => {
      test()
        .isUndefined ('fail', 'data', data)
        .done()
      ;
    })
    .catch (err => {
      test()
        .isError ('fail', 'err', err)
        .isNotEmpty ('fail', 'err.message', err && err.message)
        .isNumber ('fail', 'err.statusCode', err && err.statusCode)
        .done()
      ;
    })
  ;
});


dotest.add ('Error handling: Client error', test => {
  app ()
    .then (data => {
      test()
        .isUndefined ('fail', 'data', data)
        .done()
      ;
    })
    .catch (err => {
      test()
        .isError ('fail', 'err', err)
        .isNotEmpty ('fail', 'err.message', err && err.message)
        .done()
      ;
    })
  ;
});


dotest.run ();
