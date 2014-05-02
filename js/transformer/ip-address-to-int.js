var _ = require('underscore');
var ip = require('ip');
var Conversion = require('../conversion');

var c = module.exports = new Conversion({
  // @context and type filled in automatically.
  'id': 'ip-address-to-int',
  'description': 'IP Address to integer conversion: 127.0.0.1 -> 2130706433',
  'invertible': true,
});

c.convert = function(ipStr) {
  if (!_.isString(ipStr))
    throw new Error('TypeError: ipStr must be a string.')

  return ip.toLong(ipStr);
}

c.invert = function(int) {
  int = parseInt(int, 10)
  return ip.fromLong(int);
}
