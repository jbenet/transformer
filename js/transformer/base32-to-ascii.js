var base32 = require('base32');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Base32 = Loader('base32');
var Ascii = Loader('ascii');

module.exports = new Conversion(Base32ToAscii, {
  'id': 'base32-to-ascii',
}, Base32, Ascii);

function Base32ToAscii(base32str) {
  return base32.decode(base32str);
}
