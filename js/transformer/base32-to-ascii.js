var base32 = require('base32');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Base32 = Loader('base32');
var Ascii = Loader('ascii');

module.exports = Conversion(Base32, Ascii, convert);

function convert(base32str) {
  return base32.decode(base32str);
}
