var jsxml = require('jsxml');
var Conversion = require('../conversion');
var Loader = require('../loader');
var JSONML = Loader('jsonml');
var XML = Loader('xml-string');

module.exports = new Conversion(JsonmlToXml, {
  'id': 'jsonml-to-xml-string',
}, JSONML, XML);

function JsonmlToXml(jsonml) {
  return jsxml.toXml(jsonml).toString();
}
