var Conversion = require('../conversion');
var Loader = require('../loader');
var tNumber = Loader('number');
var tString = Loader('string');

module.exports = new Conversion(tNumber, tString, convert);

function convert(num) {
  return num.toString();
};
