var fs = require('fs');
var xml = require('xml2js');
var path = require('path');
var Codec = require(path.join(__dirname, '..', 'codec'));

var XMLCodec = module.exports = new Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/xml-codec',
  'description': 'serializes to/from xml'
});

XMLCodec.encode = function(obj) {
  var builder = new xml.Builder();
  return builder.buildObject(obj);
}

XMLCodec.decode = function(buf) {
  return xml.parseString(buf, XMLCodec.onError);
}

XMLCodec.onError = function(err) {
  throw new Error('xml codec: failed to decode. ' + err)
}
