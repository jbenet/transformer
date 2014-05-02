var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var Buffer = Loader('buffer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(IPAddressToBuffer, {
  // @context and type filled in automatically.
  'id': 'ip-address-to-buffer',
  'description': 'IP Address to Buffer conversion.',
}, IPAddress, Buffer);

function IPAddressToBuffer(ipAddress) {
  return ip.toBuffer(ipAddress); // string
}
