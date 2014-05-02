var Conversion = require('../conversion');
var Loader = require('../loader');
var IPAddress = Loader('ip-address');
var tString = Loader('string');

module.exports = new Conversion(StringToIPAddress, {
  // @context and type filled in automatically.
  'id': 'string-to-ip-address',
  'description': 'string to IP Address conversion: "127.0.0.1" -> IP("127.0.0.1")',
}, tString, IPAddress);

function StringToIPAddress(string) {
  return new IPAddress(string);
}
