var Conversion = require('../conversion');
var Loader = require('../loader');
var UnixTime = Loader('unix-time');
var JsDate = Loader('js-date');

module.exports = new Conversion(UnixTimeToJsDate, {
  'id': 'unix-time-to-js-date',
}, UnixTime, JsDate);

function UnixTimeToJsDate(unixTime) {
  return new Date(unixTime * 1000.0) // Date uses ms, not s.
}
