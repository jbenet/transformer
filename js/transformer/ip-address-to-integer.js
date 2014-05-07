var ip = require('ip');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Integer = Loader('integer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(IPAddress, Integer, convert);

function convert(ipAddress, callback) {
  callback(ip.toLong(ipAddress));
};
