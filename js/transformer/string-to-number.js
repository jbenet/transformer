var Conversion = require('../conversion');
var Loader = require('../loader');
var tNumber = Loader('number');
var tString = Loader('string');

module.exports = new Conversion(StringToNumber, {
  'id': 'string-to-number',
}, tString, tNumber);

function StringToNumber(str) {
  return parseFloat(str);
};
