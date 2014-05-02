var Conversion = require('../conversion');
var Loader = require('../loader');
var tNumber = Loader('number');
var Integer = Loader('integer');

module.exports = new Conversion(NumberToInteger, {
  'id': 'number-to-integer',
}, tNumber, Integer);

function NumberToInteger(num) {
  return Math.round(num);
};
