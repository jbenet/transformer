var Conversion = require('../conversion');
var Loader = require('../loader');
var IPAddress = Loader('ip-address');
var tString = Loader('string');

module.exports = new Conversion(IPAddressToString, {
  // @context and type filled in automatically.
  'id': 'ip-address-to-string',
  'description': 'IP Address to string conversion: IP("127.0.0.1") -> "127.0.0.1"',
}, IPAddress, tString);

function IPAddressToString(ipAddress) {
  return ipAddress;
}
