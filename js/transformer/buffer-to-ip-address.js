var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var Buffer = Loader('buffer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(Buffer, IPAddress, convert);

function convert(ipBuffer) {
  return ip.toString(ipBuffer);
}
