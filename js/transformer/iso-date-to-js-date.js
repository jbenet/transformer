var Conversion = require('../conversion');
var Loader = require('../loader');
var IsoDate = Loader('iso-date');
var JsDate = Loader('js-date');

module.exports = new Conversion(IsoDateToJsDate, {
  'id': 'iso-date-to-js-date',
}, IsoDate, JsDate);

function IsoDateToJsDate(isoDate) {
  return new Date(isoDate);
}
