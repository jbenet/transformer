var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Hex = Loader('hex');

module.exports = new Conversion(HexToBuffer, {
  'id': 'hex-to-buffer',
}, Hex, Buffer);

function HexToBuffer(hex) {
  return new Buffer.Buffer(hex, 'hex');
}
