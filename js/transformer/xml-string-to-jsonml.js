var jsxml = require('jsxml');
var Conversion = require('../conversion');
var Loader = require('../loader');
var JSONML = Loader('jsonml');
var XML = Loader('xml-string');

module.exports = new Conversion(XML, JSONML, convert);

function convert(xml, callback) {
  callback(jsxml.fromXml(xml)[0]);
  // https://github.com/rasmuserik/jsxml/issues/1
}
