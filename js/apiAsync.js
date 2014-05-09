var Type = require('./type');
var Value = require('./value');
var Conversion = require('./conversion');
var Loader = require('./loader');
var coerce = require('./coerce');
var defer = require('./defer');
var _ = require('underscore');

module.exports = transformerAsync

// var a2b = transformer.converter(schema_a, schema_b)
// var b_data = a2b(a_data)
//
// var b_data = transformer.convert(schema_a, schema_b, a_data)

function transformerAsync() {
  switch (arguments.length) {
  case 0:
    throw new Error('transformer error: no arguments.')
  case 1: // loading
    return Loader(arguments[0]);
  default: // find conversions
    return transformerAsync.compose(_.toArray(arguments))
  }
}

// composition of sync functions.
transformerAsync.compose = function(types) {
  if (types.length < 2)
    throw new Error('Must enter more than one type.');

  types = _.map(types, coerce);
  var conversions = Conversion.path(types);
  conversions = _.map(conversions, forceAsyncConversion);
  var composed = composeConversions(conversions);
  return Value.wrapAsync(types[0], composed);
}

function forceAsyncConversion(conversion) {
  // todo fix this
  // if (!(conversion instanceof Conversion))
  //   throw new Error('conversion must be instance of Conversion');

  // already async?
  if (conversion.async)
    return conversion;

  return function(input, callback) {
    // catch thrown errors and pass them to the callback.
    try {
      callback(null, conversion(input));
    } catch (e) {
      callback(e);
    }
  }
}

function composeConversions(conversions) {
  // conversion composition is tricky, because we have to handle errors
  // and call the conversions in order, with a callback chain.
  var funcs = conversions.slice(0);
  var callback = undefined;

  function composed(input) {
    // take the next conversion to apply.
    var func = funcs.shift();

    if (!func) { // no more? we've reached the end.
      callback(null, input);
      return;
    }

    func(input, function(err, output) {
      if (err) { // shortcircuit
        defer(callback, err);
      } else {
        defer(composed, output);
      }
    });
  };

  return function(input, cb) {
    callback = cb; // store callback;
    composed(input);
  };
}
