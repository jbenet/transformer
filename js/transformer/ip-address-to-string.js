var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var tString = Loader('string');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(IPAddress, tString, convert);

function convert(ipAddr) {
  ipAddr = ip.toString(ip.toBuffer(ipAddr)); //TODO: validate better.
  return ipAddr; // already a string
}
