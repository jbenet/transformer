var base32 = require('base32')
var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var tBase32 = Loader('base32');

module.exports = new Conversion(BufferToBase32, {
  'id': 'buffer-to-base32',
}, Buffer, tBase32);

function BufferToBase32(buffer) {
  return base32.encode('base32');
}
