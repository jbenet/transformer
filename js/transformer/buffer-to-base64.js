var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Base64 = Loader('base64');

module.exports = new Conversion(Buffer, Base64, convert);

function convert(buffer, callback) {
  callback(buffer.toString('base64'));
}
