var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var Buffer = Loader('buffer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(BufferToIPAddress, {
  // @context and type filled in automatically.
  'id': 'buffer-to-ip-address',
  'description': 'Buffer to IP Address conversion.',

}, Buffer, IPAddress);

function BufferToIPAddress(ipBuffer) {
  return ip.toString(ipBuffer);
}
