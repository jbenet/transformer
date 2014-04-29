var _ = require('underscore');
var ip = require('ip');
var Codec = require('../codec');

var IPCodec = module.exports = new Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/ip-address-string',
  'description': 'IP Address string encoding: 127.0.0.1'
});

IPCodec.encode = function(ipStr) {
  if (!_.isString(ipStr))
    throw new Error('TypeError: ipStr must be a string.')

  return ip.toBuffer(ipStr);
}

IPCodec.decode = function(ipBuffer) {
  if (!(ipBuffer instanceof Buffer))
    throw new Error('TypeError: ipBuffer must be a Buffer.');

  return ip.toString(ipBuffer);
}
