var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var tString = Loader('string');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(StringToIPAddress, {
  // @context and type filled in automatically.
  'id': 'string-to-ip-address',
}, tString, IPAddress);

function StringToIPAddress(str) {
  str = ip.toString(ip.toBuffer(str)); //TODO: validate better.
  return str; // already ip address
}
