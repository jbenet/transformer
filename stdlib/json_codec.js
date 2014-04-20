var transformer = require('transformer');

var JSONCodec = module.exports = new transformer.Codec({
  '@context': 'http://transformer.io/context/transformer.jsonld',
  '@type': 'Codec',
  '@id': 'transformer/json'
});

JSONCodec.encode = function(obj) {
  return JSON.stringify(obj);
}

JSONCodec.decode = function(buf) {
  return JSON.parse(buf);
}
