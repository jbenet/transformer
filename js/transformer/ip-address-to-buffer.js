var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var Buffer = Loader('buffer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(IPAddress, Buffer, convert);

function convert(ipAddress, callback) {
  callback(ip.toBuffer(ipAddress)); // string
}
