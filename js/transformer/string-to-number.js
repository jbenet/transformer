var Conversion = require('../conversion');
var Loader = require('../loader');
var tNumber = Loader('number');
var tString = Loader('string');

module.exports = new Conversion(tString, tNumber, convert);

function convert(str) {
  return parseFloat(str);
};
