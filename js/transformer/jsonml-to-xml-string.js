var jsxml = require('jsxml');
var Conversion = require('../conversion');
var Loader = require('../loader');
var JSONML = Loader('jsonml');
var XML = Loader('xml-string');

module.exports = new Conversion(JSONML, XML, convert);

function convert(jsonml) {
  return jsxml.toXml(jsonml).toString();
}
