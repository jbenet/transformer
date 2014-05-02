var Conversion = require('../conversion');
var Loader = require('../loader');
var tString = Loader('string');
var tJSON = Loader('json');

module.exports = new Conversion(JSONToString, {
  'id': 'json-to-string',
}, tJSON, tString);

function JSONToString(json) {
  return JSON.stringify(json);
}
