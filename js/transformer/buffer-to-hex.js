var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Hex = Loader('hex');

module.exports = new Conversion(Buffer, Hex, convert);

function convert(buffer) {
  return buffer.toString('hex');
}
