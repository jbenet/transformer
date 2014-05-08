var Conversion = require('../conversion');
var Loader = require('../loader');
var tBuffer = Loader('buffer');
var Ascii = Loader('ascii');

module.exports = new Conversion(tBuffer, Ascii, convert);

function convert(buffer) {
  return buffer.toString('ascii');
}
