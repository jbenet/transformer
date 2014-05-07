var Conversion = require('../conversion');
var Loader = require('../loader');
var UnixTime = Loader('unix-time');
var JsDate = Loader('js-date');

module.exports = new Conversion(JsDate, UnixTime, convert);

function convert(jsDate, callback) {
  callback(jsDate.getTime() / 1000.0); // Date uses ms, not s.
}
