var _ = require('underscore');
var loader = require(path.join(__dirname, 'loader'));

module.exports = Type

var type_defaults = {
  '@context': 'http://transformer.io/context/transformer.jsonld',
  '@type': 'Type',
  'codec': 'transformer/identity-codec'
}

function Type (src) {
  if (src instanceof Type)
    return src;

  if (!(this instanceof Type))
    return new Type(src);

  if (!_.isObject(src))
    throw new Exception('TypeError: expected Type object. ' + src)

  // copy for modification
  src = _.copy(src)

  // if not a full type, just schema, wrap it.
  if (!src['schema'])
    src = {'schema': src};

  // fill in defaults
  _.defaults(src, defaults)

  this.src = src;
  this.codec = loader(src.codec);
}
