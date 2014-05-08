var Conversion = require('../conversion');
var Loader = require('../loader');
var UnixTime = Loader('unix-time');
var JsDate = Loader('js-date');

module.exports = new Conversion(UnixTime, JsDate, convert);

function convert(unixTime) {
  return new Date(unixTime * 1000.0); // Date uses ms, not s.
}
