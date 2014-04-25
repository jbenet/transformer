var Codec = require('../codec');
var jsxml = require('jsxml');

var XMLCodec = module.exports = new Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/jsonml-xml-codec',
  'description': 'serializes to/from xml (jsonml)'
});

XMLCodec.encode = function(obj) {
  return jsxml.toXml(obj);
}

XMLCodec.decode = function(buf) {
  return jsxml.fromXml(buf)[0];
}
