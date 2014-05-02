var Conversion = require('../conversion');
var Loader = require('../loader');
var Base64 = Loader('base64');
var Ascii = Loader('ascii');

module.exports = new Conversion(Base64ToAscii, {
  'id': 'base64-to-ascii',
}, Base64, Ascii);

function Base64ToAscii(base64str) {
  return (new Buffer(base64str, 'base64')).toString('ascii');
}
