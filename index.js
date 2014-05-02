var Type = require('./js/type');
var Value = require('./js/value');
var Conversion = require('./js/conversion');
var Loader = require('./js/loader');
var coerce = require('./js/coerce');
var _ = require('underscore');

module.exports = transformer

// var a2b = transformer.converter(schema_a, schema_b)
// var b_data = a2b(a_data)
//
// var b_data = transformer.convert(schema_a, schema_b, a_data)

function transformer(from, to, data_from) {
  switch (arguments.length) {
  case 3:
    return transformer.transform(from, to, data_from);
  case 2:
    return transformer.transformer(from, to);
  default:
    throw new Error('transformer error: incorrect arguments to transformer.')
  }
}


// transformer is one of the main API methods. it returns a function that
// can be directly applied to data.

// (wraps raw data with a Value).
transformer.transformer = function(from, to) {
  var t = transformer._transformer(from, to);
  return Value.wrap(from, t);
}

// internal transformer creation function.
transformer._transformer = function(from, to) {
  from = coerce(from);
  to = coerce(to);

  Type.check(from);
  Type.check(to);

  var convert = Conversion.withTypes(from, to);

  return function(input) {
    Type.check(input.type, from);
    var output = convert(input);
    Type.check(output.type, to);
    return output;
  }
}

transformer.transform = function(from, to, data_from) {
  // create transformer + apply it.
  return transformer.transformer(from, to)(data_from);
}

transformer.compose = function(types) {

  var pairs = _.zip(types.slice(0, types.length - 1), types.slice(1));
  var transformers = _.map(pairs, function(pair) {
    return transformer._transformer(pair[0], pair[1]);
  });

  var composed = _.compose.apply(_, transformers.reverse());
  return Value.wrap(types[0], composed); // wrap/unwrap Value
}

transformer.coerce = coerce;
transformer.load = Loader;

transformer.Type = Type;
transformer.Conversion = Conversion;
transformer.Loader = Loader;
