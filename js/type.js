var _ = require('underscore');
var Object = require('./object');

module.exports = Type

var type_defaults = {
  'type': 'Type',
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

  // if not a full type, just schema, wrap it.
  if (_.isObject(src) && !src['schema'])
    src = {'schema': src};

  this.src = Object(src, type_defaults);
}

Type.check = function typeCheck(typeA, typeB) {
  if (!typeB) // ensuring typeA is a Type.
    return typeA instanceof Type;

  // for now, ensure they're the same thing. handle abstraction later.
  return typeA === typeB;
};
