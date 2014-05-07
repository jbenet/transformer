var Conversion = require('../conversion');
var Loader = require('../loader');
var Base64 = Loader('base64');
var Ascii = Loader('ascii');

module.exports = new Conversion(Ascii, Base64, convert);

function convert(ascii, callback) {
  var buf = new Buffer(ascii, 'ascii');
  callback(buf.toString('base64'));
}
