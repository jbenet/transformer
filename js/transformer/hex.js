var _ = require('underscore');
var Codec = require('../codec');

var HexCodec = module.exports = new Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/ip-address-ascii',
  'description': 'IP Address ascii encoding: 127.0.0.1 is '
});

HexCodec.encode = function(buf) {
  if (!(buf instanceof Buffer))
    throw new Error('TypeError: buf must be a Buffer.')

  return buf.toString('hex');
}

HexCodec.decode = function(hex) {
  if (!_.isString(hex))
    throw new Error('TypeError: hex must be a string.');

  return new Buffer(hex, 'hex');
}
