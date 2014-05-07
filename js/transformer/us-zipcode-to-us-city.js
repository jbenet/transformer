var Conversion = require('../conversion');
var Loader = require('../loader');
var Zipcode = Loader('us-zipcode');
var City = Loader('us-city');
var zipdb = require('zippity-do-dah');

module.exports = new Conversion(Zipcode, City, convert);

function convert(zipcode, callback) {
  var r = zipdb.zipcode(zipcode);
  callback(r.city +', '+ r.state);
}
