var base32 = require('base32');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var tBase32 = Loader('base32');

module.exports = new Conversion(tBase32, Buffer, convert);

function convert(base32str, callback) {
  callback(base32.decode(base32str));
}
