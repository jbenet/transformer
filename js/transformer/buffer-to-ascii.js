var Conversion = require('../conversion');
var Loader = require('../loader');
var tBuffer = Loader('buffer');
var Ascii = Loader('ascii');

module.exports = new Conversion(BufferToAscii, {
  'id': 'buffer-to-ascii',
}, tBuffer, Ascii);

function BufferToAscii(buffer) {
  return buffer.toString('ascii');
}
