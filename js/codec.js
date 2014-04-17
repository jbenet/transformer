var _ = require('underscore');

module.exports = Codec

var codec_defaults = {
  '@context': 'http://pandat.io/context/pandat.jsonld',
  '@type': 'Codec',
}

function Codec(src, encode, decode) {
  if (src instanceof Codec)
    return src;

  if (!(this instanceof Codec))
    return new Codec(src, code, decode);

  if (!_.isObject(src))
    throw new Exception('TypeError: expected Type object. ' + src)

  if (!_.isString(src["@id"]) || !(src["@id"].length > 0))
    throw new Exception('id must be a nonempty string. Got '+id);

  // copy for modification
  src = _.extend({}, codec_defaults, src)


  this.src = src;
  this.encode = encode || identity;
  this.decode = decode || identity;
}

function identity(a) { return a; }
Codec.Identity = new Codec('pandat/identity-codec');
