var _ = require('underscore');
var Type = require(path.join(__dirname, 'type'));
var Codec = require(path.join(__dirname, 'codec'));

module.exports = Loader;

function Loader(id) {
  if (!_.isString(id) || !(id.length > 0))
    throw new Exception('id must be a nonempty string. Got '+id);

  src = Loader.load_src(id);
  if (!_.isObject(src))
    throw new Exception('TypeError: expected object. Got ' + src)

  switch(src["@type"]) {
  case "Type":
    return new Type(src);
  case "Codec":
    return new Codec(src);
  default:
    throw new Exception("Loaded unknown type: " + src["@type"]);
  }


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
