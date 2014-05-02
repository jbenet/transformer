var Conversion = require('../conversion');
var Loader = require('../loader');
var tNumber = Loader('number');
var tString = Loader('string');

module.exports = new Conversion(NumberToString, {
  'id': 'number-to-string',
}, tNumber, tString);

function NumberToString(num) {
  return num.toString();
};
