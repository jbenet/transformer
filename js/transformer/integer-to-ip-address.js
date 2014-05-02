var ip = require('ip');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Integer = Loader('integer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(IntegerToIPAddress, {
  'id': 'integer-to-ip-address',
}, Integer, IPAddress);

function IntegerToIPAddress(int) {
  return ip.fromLong(int);
};
