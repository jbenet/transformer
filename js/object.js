var _ = require('underscore');

module.exports = Object

function Object(src, defaults) {
  if (!_.isObject(src))
    throw new Error('TypeError: expected object definition. ' + src)

  if (!_.isString(src.id) || !(src.id.length > 0))
    throw new Error('id must be a nonempty string. Got '+ src.id);

  // copy for modification
  src = _.extend({}, Object.defaults, defaults, src)

  return src
}

Object.contextUrl = 'http://transformer.io/context/transformer.jsonld'

Object.defaults = {
  '@context': Object.contextUrl,
}
