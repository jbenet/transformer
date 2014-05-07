var ip = require('ip');
var Loader = require('../loader');
var Conversion = require('../conversion');
var tString = Loader('string');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(tString, IPAddress, convert);

function convert(str, callback) {
  str = ip.toString(ip.toBuffer(str)); //TODO: validate better.
  callback(str); // already ip address
}
