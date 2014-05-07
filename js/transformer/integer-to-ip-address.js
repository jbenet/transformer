var ip = require('ip');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Integer = Loader('integer');
var IPAddress = Loader('ip-address');

module.exports = new Conversion(Integer, IPAddress, convert);

function convert(int, callback) {
  callback(ip.fromLong(int));
};
