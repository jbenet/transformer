var path = require('path');
var Codec = require(path.join(__dirname, '..', 'codec'));

var IdentityCodec = module.exports = new Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/identity-codec',
  'description': 'default codec; does nothing'
});

IdentityCodec.encode = function(obj) {
  return obj;
}

IdentityCodec.decode = function(buf) {
  return buf;
}
