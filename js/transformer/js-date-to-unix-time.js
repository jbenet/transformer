var Conversion = require('../conversion');
var Loader = require('../loader');
var UnixTime = Loader('unix-time');
var JsDate = Loader('js-date');

module.exports = new Conversion(JsDateToUnixTime, {
  'id': 'js-date-to-unix-time',
}, JsDate, UnixTime);

function JsDateToUnixTime(jsDate) {
  return jsDate.getTime() / 1000.0; // Date uses ms, not s.
}
