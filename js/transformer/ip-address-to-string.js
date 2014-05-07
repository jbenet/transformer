var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var tString = Loader('string');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(IPAddress, tString, convert);

function convert(ipAddr, callback) {
  ipAddr = ip.toString(ip.toBuffer(ipAddr)); //TODO: validate better.
  callback(ipAddr); // already a string
}
