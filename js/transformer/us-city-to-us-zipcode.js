var Conversion = require('../conversion');
var Loader = require('../loader');
var Zipcode = Loader('us-zipcode');
var City = Loader('us-city');
var zipdb = require('zippity-do-dah');

module.exports = new Conversion(CityToZipcode, {
  'id': 'us-zipcode-to-us-city',
}, Zipcode, City);

function CityToZipcode(city) {
  var parts = city.split(',');
  if (!parts.length == 2)
    throw new Error('City with invalid format.')
  var r = zipdb.citystate(parts[0].trim(), parts[1].trim());
  return r.zipcode;
}