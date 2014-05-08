var Conversion = require('../conversion');
var Loader = require('../loader');
var tBuffer = Loader('buffer');
var Ascii = Loader('ascii');

module.exports = new Conversion(Ascii, tBuffer, convert);

function convert(ascii) {
  return new Buffer(ascii, 'ascii');
}
