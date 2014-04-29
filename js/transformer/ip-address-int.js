var _ = require('underscore');
var ip = require('ip');
var Codec = require('../codec');

var IPCodec = module.exports = new Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/ip-address-int',
  'description': 'IP Address integer encoding: 127.0.0.1 is 2130706433'
});

IPCodec.encode = function(ipStr) {
  if (!_.isString(ipStr))
    throw new Error('TypeError: ipStr must be a string.')

  return ip.toLong(ipStr);
}

IPCodec.decode = function(int) {
  int = parseInt(int, 10)
  return ip.fromLong(int);
}
