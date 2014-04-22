var fs = require('fs');
var xml = require('xml2js');
var transformer = require('transformer');

var XMLCodec = module.exports = new transformer.Codec({
  '@context': 'http://transformer.io/context/transformer.jsonld',
  '@type': 'Codec',
  '@id': 'transformer/xml'
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
