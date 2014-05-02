var Conversion = require('../conversion');
var Loader = require('../loader');
var tString = Loader('string');
var tJSON = Loader('json');

module.exports = new Conversion(StringToJSON, {
  'id': 'string-to-json',
}, tString, tJSON);

function StringToJSON(str) {
  return JSON.parse(str);
}
