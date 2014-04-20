var _ = require('underscore');
var loader = require(path.join(__dirname, 'loader'));

module.exports = Object

function Object(src, defaults) {
  if (_.isString(src))
    src = loader(src);

  if (!_.isObject(src))
    throw new Error('TypeError: expected object definition. ' + src)

  if (!_.isString(src["@id"]) || !(src["@id"].length > 0))
    throw new Error('id must be a nonempty string. Got '+ src["@id"]);

  // copy for modification
  src = _.extend({}, defaults, src)

  return src
}
