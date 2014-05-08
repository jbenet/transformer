var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var tString = Loader('string');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(tString, IPAddress, convert);

function convert(str) {
  str = ip.toString(ip.toBuffer(str)); //TODO: validate better.
  return str; // already ip address
}
