var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Hex = Loader('hex');

module.exports = new Conversion(Hex, Buffer, convert);

function convert(hex) {
  return new Buffer.Buffer(hex, 'hex');
}
