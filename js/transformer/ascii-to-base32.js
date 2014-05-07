var base32 = require('base32');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Base32 = Loader('base32');
var Ascii = Loader('ascii');

module.exports = new Conversion(Ascii, Base32, convert);

function convert(ascii, callback) {
  callback(base32.encode(ascii));
};
