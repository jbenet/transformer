var _ = require('underscore');
var Loader = require('./loader');
var Object = require('./object');

module.exports = Type

var type_defaults = {
  'type': 'Type',
  'codec': 'transformer/identity-codec'
}

// A Type is one of the three Transformer kinds.
// Types are descriptions of kinds of objects. They uniquely identify
// a "kind", "type", or "category" of data. If raw data is just a bunch of
// bytes, Types give that data semantic meaning.
// (e.g. number, text, date, email-address, phone-number, geometry)

// Types are very simple, expressed as json-ld documents that giving the type
// a simple, meaningful name. Some type descriptions include default codecs.

// Types are the way we give data semantic meaning. Types are related (linked)
// to Codecs and Conversions. Transformer leverages this to simplify
// transforming one stream of bytes into another.


function Type (src) {
  if (src instanceof Type)
    return src;

  if (!(this instanceof Type))
    return new Type(src);

  // if not a full type, just schema, wrap it.
  if (_.isObject(src) && !src['schema'])
    src = {'schema': src};

  src = Object(src, type_defaults);

  this.src = src;
  this.codec = Loader(src.codec);
}

Type.prototype.decode = function() {
  return this.codec.decode.apply(this.codec, arguments);
}

Type.prototype.encode = function() {
  return this.codec.encode.apply(this.codec, arguments);
}
