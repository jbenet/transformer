var Conversion = require('../conversion');
var Loader = require('../loader');
var tString = Loader('string');
var tJSON = Loader('json');

module.exports = new Conversion(tString, tJSON, convert);

function convert(str, callback) {
  callback(JSON.parse(str));
}
