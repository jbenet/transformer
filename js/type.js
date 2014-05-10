var _ = require('underscore');
var Object = require('./object');
var Loader = require('./loader');

module.exports = Type

var type_defaults = {
  'type': 'type',
}

// A Type is one of the two Transformer objects.
// Types are descriptions of kinds of objects. They uniquely identify
// a "kind", "type", or "category" of data. If raw data is just a bunch of
// bytes, Types give that data semantic meaning.
// (e.g. number, text, date, email-address, phone-number, geometry)

// Types are very simple, expressed as json-ld documents that giving the type
// a simple, meaningful name.

// Types are the way we give data semantic meaning. Types are related (linked)
// by Conversions. Transformer leverages this to simplify transforming one
// stream of bytes into another.


function Type(src) {
  if (src instanceof Type)
    return src;

  if (!(this instanceof Type))
    return new Type(src);

  // if it has been seen before, return that.
  if (src && Type.all[src])
    return Type.all[src];

  if (src && src.id && Type.all[src.id])
    return Type.all[src.id];

  // if not a full type, just schema, wrap it.
  if (_.isObject(src) && !src['schema'])
    src = {'schema': src};

  // if without a description, use id
  src.description = src.description || src.id;

  this.src = Object(src, type_defaults);
  this.type = Type;
  Type.all[this.src.id] = this;
  Loader.cache[this.src.id] = this;
}

Type.all = {};

Type.check = function typeCheck(typeA, typeB) {
  if (!typeB) // ensuring typeA is a Type.
    return typeA instanceof Type;

  // for now, ensure they're the same thing. handle abstraction later.
  return typeA === typeB;
};
