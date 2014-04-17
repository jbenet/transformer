var Type = require(path.join(__dirname, 'js', 'type'));
var Codec = require(path.join(__dirname, 'js', 'codec'));
var Conversion = require(path.join(__dirname, 'js', 'conversion'));
var Loader = require(path.join(__dirname, 'js', 'loader'));

// var a2b = pandat.converter(schema_a, schema_b)
// var b_data = a2b(a_data)
//
// var b_data = pandat.convert(schema_a, schema_b, a_data)

function pandat(schema_from, schema_to, data_from) {
  switch (arguments.length) {
  case 3:
    return pandat.convert(schema_from, schema_to, data_from);
  case 2:
    return pandat.converter(schema_from, schema_to);
  default:
    throw new Exception('pandat error: incorrect arguments to pandat.')
  }
}


pandat.converter = function(schema_from, schema_to) {
  schema_from = pandat.coerce_schema(schema_from);
  schema_to = pandat.coerce_schema(schema_to);

  return function() {
    // function to convert from -> to
  }
}


pandat.convert = function(schema_from, schema_to, data_from) {
  var converter = pandat.converter(schema_from, schema_to);
  return converter(data_from);
}

pandat.Type = Type;
pandat.Codec = Codec;
pandat.Conversion = Conversion;
pandat.Loader = Loader;

module.exports = pandat
