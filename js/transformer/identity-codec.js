var transformer = require('transformer');

var Codec = module.exports = new transformer.Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/identity-codec',
  'description': 'default codec; does nothing'
});

Codec.encode = function(obj) {
  return obj;
}

Codec.decode = function(buf) {
  return buf;
}
