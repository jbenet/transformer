var ip = require('ip');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Integer = Loader('integer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(IPAddressToInteger, {
  'id': 'ip-address-to-integer',
}, IPAddress, Integer);

function IPAddressToInteger(ipAddress) {
  return ip.toLong(ipAddress);
};
