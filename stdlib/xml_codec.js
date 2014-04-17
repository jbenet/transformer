var fs = require('fs');
var xml = require('xml2js');
var pandat = require('pandat');

var XMLCodec = module.exports = new pandat.Codec({
  '@context': 'http://pandat.io/context/pandat.jsonld',
  '@type': 'Codec',
  '@id': 'pandat/xml'
});

XMLCodec.encode = function(obj) {
  var builder = new xml.Builder();
  return builder.buildObject(obj);
}

XMLCodec.decode = function(buf) {
  return xml.parseString(buf, XMLCodec.onError);
}

XMLCodec.onError = function(err) {
  throw new Exception('pandat codec: failed to decode. ' + err)
}
