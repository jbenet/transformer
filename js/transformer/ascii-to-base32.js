var base32 = require('base32');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Base32 = Loader('base32');
var Ascii = Loader('ascii');

module.exports = new Conversion(AsciiToBase32, {
  'id': 'ascii-to-base32',
}, Ascii, Base32);

function AsciiToBase32(ascii) {
  return base32.encode(ascii);
}
