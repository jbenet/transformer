var Conversion = require('../conversion');
var Loader = require('../loader');
var IsoDate = Loader('iso-date');
var JsDate = Loader('js-date');

module.exports = new Conversion(IsoDate, JsDate, convert);

function convert(isoDate) {
  return new Date(isoDate);
}
