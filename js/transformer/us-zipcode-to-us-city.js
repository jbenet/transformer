var Conversion = require('../conversion');
var Loader = require('../loader');
var Zipcode = Loader('us-zipcode');
var City = Loader('us-city');
var zipdb = require('zippity-do-dah');

module.exports = new Conversion(Zipcode, City, convert);

function convert(zipcode) {
  var r = zipdb.zipcode(zipcode);
  return r.city +', '+ r.state;
}
