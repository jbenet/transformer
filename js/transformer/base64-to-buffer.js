var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Base64 = Loader('base64');

module.exports = new Conversion(Base64ToBuffer, {
  'id': 'base64-to-buffer',
}, Base64, Buffer);

function Base64ToBuffer(base64str) {
  return new Buffer.Buffer(base64str, 'base64');
}
