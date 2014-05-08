var Type = require('./type');
var Value = require('./value');
var Conversion = require('./conversion');
var Loader = require('./loader');
var coerce = require('./coerce');
var _ = require('underscore');

module.exports = transformerSync

// var a2b = transformer.converter(schema_a, schema_b)
// var b_data = a2b(a_data)
//
// var b_data = transformer.convert(schema_a, schema_b, a_data)

function transformerSync() {
  switch (arguments.length) {
  case 0:
    throw new Error('transformer error: no arguments.')
  case 1: // loading
    return Loader(from);
  case 2: // find conversion
    return transformerSync.transformer(from, to);
  default:
    return transformerSync.compose(_.toArray(arguments))
  }
}

// transformer is one of the main API methods. it returns a function that
// can be directly applied to data. (wraps raw data with a Value).
transformerSync.transformer = function(from, to) {
  from = coerce(from);
  to = coerce(to);

  var convert = Conversion.withTypes(from, to);
  return Value.wrapSync(from, convert);
}

// composition of sync functions.
transformerSync.compose = function(types) {
  if (types.length < 2)
    throw new Error('Must enter more than one type.');

  types = _.map(types, coerce);
  conversions = Conversion.path(types);
  composed = _.compose(conversions.reverse());
  return Value.wrapSync(types[0], composed);
}
