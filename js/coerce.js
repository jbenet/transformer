var _ = require('underscore');
var Loader = require('./loader');
var Object = require('./object');
var Type; // dep cycle
var Value; // dep cycle
var Conversion; // dep cycle


module.exports = function coerce(obj) {

  if (!Conversion || !Type || !Value)
    resolveDeps();

  // string? load module.
  if (_.isString(obj))
    return Loader(obj);

  // transformer object? all good.
  if (obj instanceof Value ||
      obj instanceof Type ||
      obj instanceof Conversion ||
      obj === Type ||
      obj === Conversion ||
      (obj.src && obj.src["@context"] == Object.contextUrl)) {
    return obj;
  }

  // raw object with type? construct.
  if (_.isObject(obj) && obj['type']) {
    switch (obj['type']) {
    case 'type': return Type(obj);
    case 'conversion': return Conversion(obj);
    }
  }

  // wat?
  console.log(obj);
  throw new Error('transformer: unknown input object: ' + obj);
};

function resolveDeps() {
  Type = require('./type');
  Value = require('./value');
  Conversion = require('./conversion');
}
