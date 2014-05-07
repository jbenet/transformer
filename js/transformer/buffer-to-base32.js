var base32 = require('base32')
var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var tBase32 = Loader('base32');

module.exports = new Conversion(Buffer, tBase32, convert);

function convert(buffer, callback) {
  callback(base32.encode('base32'));
}
