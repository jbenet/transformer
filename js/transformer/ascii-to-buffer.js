var Conversion = require('../conversion');
var Loader = require('../loader');
var tBuffer = Loader('buffer');
var Ascii = Loader('ascii');

module.exports = new Conversion(AsciiToBuffer, {
  'id': 'ascii-to-buffer',
}, Ascii, tBuffer);

function AsciiToBuffer(ascii) {
  return new Buffer(ascii, 'ascii');
}
