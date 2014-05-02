var base32 = require('base32');
var Conversion = require('../conversion');
var Loader = require('../loader');
var Buffer = Loader('buffer');
var tBase32 = Loader('base32');

module.exports = new Conversion(Base32ToBuffer, {
  'id': 'base32-to-buffer',
}, tBase32, Buffer);

function Base32ToBuffer(base32str) {
  return base32.decode(base32str);
}
