var Conversion = require('../conversion');
var Loader = require('../loader');
var tNumber = Loader('number');
var Integer = Loader('integer');

module.exports = new Conversion(tNumber, Integer, convert);

function convert(num, callback) {
  callback(Math.round(num));
};
