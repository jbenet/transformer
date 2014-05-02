var Conversion = require('../conversion');
var Loader = require('../loader');
var Base64 = Loader('base64');
var Ascii = Loader('ascii');

module.exports = new Conversion(AsciiToBase64, {
  'id': 'ascii-to-base64',
}, Ascii, Base64);

function AsciiToBase64(ascii) {
  return (new Buffer(ascii, 'ascii')).toString('base64');
}
