var path = require('path');
var Codec = require(path.join(__dirname, '..', 'codec'));

var JSONCodec = module.exports = new Codec({
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
