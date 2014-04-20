var Type = require(path.join(__dirname, 'js', 'type'));
var Codec = require(path.join(__dirname, 'js', 'codec'));
var Conversion = require(path.join(__dirname, 'js', 'conversion'));
var Loader = require(path.join(__dirname, 'js', 'loader'));

module.exports = transformer

// var a2b = transformer.converter(schema_a, schema_b)
// var b_data = a2b(a_data)
//
// var b_data = transformer.convert(schema_a, schema_b, a_data)

function transformer(type_from, type_to, data_from) {
  switch (arguments.length) {
  case 3:
    return transformer.convert(type_from, type_to, data_from);
  case 2:
    return transformer.converter(type_from, type_to);
  default:
    throw new Error('transformer error: incorrect arguments to transformer.')
  }
}


transformer.converter = function(schema_from, schema_to) {
  schema_from = Type(schema_from);
  schema_to = Type(schema_to);

  return function() {
    // function to convert from -> to
  }
}


transformer.convert = function(schema_from, schema_to, data_from) {
  var converter = transformer.converter(schema_from, schema_to);
  return converter(data_from);
}

transformer.Type = Type;
transformer.Codec = Codec;
transformer.Conversion = Conversion;
transformer.Loader = Loader;
