var transformer = require('transformer');

var JSONCodec = module.exports = new transformer.Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/json-codec',
  'description': 'serializes to/from json'
});

JSONCodec.encode = function(obj) {
  return JSON.stringify(obj);
}

JSONCodec.decode = function(buf) {
  return JSON.parse(buf);
}
