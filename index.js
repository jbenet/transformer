var path = require('path');
var Type = require(path.join(__dirname, 'js', 'type'));
var Codec = require(path.join(__dirname, 'js', 'codec'));
var Conversion = require(path.join(__dirname, 'js', 'conversion'));
var Loader = require(path.join(__dirname, 'js', 'loader'));
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


transformer.transformer = function(from, to) {
  from = transformer.coerce_object(from);
  to = transformer.coerce_object(to);

  if (!(from instanceof Type || from instanceof Codec)) {
    throw new Error('conversion source must be Type or Codec.');
  }

  if (!(to instanceof Type || to instanceof Codec)) {
    throw new Error('conversion target must be Type or Codec.');
  }

  // default to no conversion. (from or to is codec).
  var convert = function(input) { return input; }

  // if from && to are Types, find their conversion function.
  if (from instanceof Type && to instanceof Type) {
    // not implemented yet.
  }

  return function(input_data) {
    var d = from.decode(input_data);
    var c = convert(d);
    var e = to.encode(c);
    return e;
  }
}

transformer.transform = function(from, to, data_from) {
  // create transformer + apply it.
  return transformer.transformer(from, to)(data_from);
}

transformer.coerce_object = function(obj) {
  // string? load module.
  if (_.isString(obj))
    return Loader(obj);

  // transformer object? all good.
  if (obj instanceof Type ||
      obj instanceof Codec ||
      obj instanceof Conversion) {
    return obj;
  }

  // raw object with @type? construct.
  if (_.isObject(obj) && obj['@type']) {
    switch (obj['@type']) {
    case 'Type': return Type(obj);
    case 'Codec': return Codec(obj);
    case 'Conversion': return Conversion(obj);
    }
  }

  // wat?
  throw new Error('transformer: unknown input object.');
}

transformer.Type = Type;
transformer.Codec = Codec;
transformer.Conversion = Conversion;
transformer.Loader = Loader;
