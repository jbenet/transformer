var path = require('path');
var _ = require('underscore');
var Loader = require(path.join(__dirname, 'loader'));
var Object = require(path.join(__dirname, 'object'));

module.exports = Type

var type_defaults = {
  '@type': 'Type',
  'codec': 'transformer/identity-codec'
}

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
