var pandat = require('pandat');

var JSONCodec = module.exports = new pandat.Codec({
  '@context': 'http://pandat.io/context/pandat.jsonld',
  '@type': 'Codec',
  '@id': 'pandat/json'
});

JSONCodec.encode = function(obj) {
  return JSON.stringify(obj);
}

JSONCodec.decode = function(buf) {
  return JSON.parse(buf);
}
