var Conversion = require('../conversion');
var Loader = require('../loader');
var tString = Loader('string');
var tJSON = Loader('json');

module.exports = new Conversion(tJSON, tString, convert);

function convert(json, callback) {
  callback(JSON.stringify(json));
}
