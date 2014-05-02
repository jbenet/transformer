var _ = require('underscore');
var Loader = require('./loader');
var Object = require('./object');
var Type = require('./type');
var Value = require('./value');
var Conversion = require('./conversion');


module.exports = function coerce(obj) {

  // string? load module.
  if (_.isString(obj))
    return Loader(obj);

  // transformer object? all good.
  if (obj instanceof Value ||
      obj instanceof Type ||
      obj instanceof Conversion ||
      obj === Type ||
      obj === Conversion) {
    return obj;
  }

  // raw object with type? construct.
  if (_.isObject(obj) && obj['type']) {
    switch (obj['type']) {
    case 'Type': return Type(obj);
    case 'Conversion': return Conversion(obj);
    }
  }

  // wat?
  console.log(obj);
  throw new Error('transformer: unknown input object: ' + obj);
};
