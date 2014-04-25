var _ = require('underscore');

module.exports = Object

var obj_defaults = {
  '@context': 'http://transformer.io/context/transformer.jsonld'
}

function Object(src, defaults) {
  if (!_.isObject(src))
    throw new Error('TypeError: expected object definition. ' + src)

  if (!_.isString(src["@id"]) || !(src["@id"].length > 0))
    throw new Error('id must be a nonempty string. Got '+ src["@id"]);

  // copy for modification
  src = _.extend({}, obj_defaults, defaults, src)

  return src
}
