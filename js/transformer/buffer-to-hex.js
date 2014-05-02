var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Hex = Loader('hex');

module.exports = new Conversion(BufferToHex, {
  // @context and type filled in automatically.
  'id': 'buffer-to-hex',
}, Buffer, Hex);

function BufferToHex(buffer) {
  return buffer.toString('hex');
}
