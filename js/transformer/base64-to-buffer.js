var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Base64 = Loader('base64');

module.exports = new Conversion(Base64, Buffer, convert);

function convert(base64str, callback) {
  callback(new Buffer.Buffer(base64str, 'base64'));
}
