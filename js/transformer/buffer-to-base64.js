var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var Base64 = Loader('base64');

module.exports = new Conversion(BufferToBase64, {
  'id': 'buffer-to-base64',
}, Buffer, Base64);

function BufferToBase64(buffer) {
  return buffer.toString('base64');
}
