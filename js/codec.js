var _ = require('underscore');
var Object = require('./object');

module.exports = Codec

var codec_defaults = {
  '@type': 'Codec',
}

// A Codec is one of the three Transformer kinds.
// Codecs are a pair of functions that serialize Types into bytes (or abritrary
// representations), and deserialize back. There MUST be no information loss
// in Codecs; they're simply representing a Type in different ways.
// E.g. json, unix-time, iso-date

// They're like a Conversion, but specifically handles
// transforming from binary to js objects and back.
// Hence encoding/decoding.

// Note: As @sebastienzany has pointed out, these technically are a special
// case of Conversions. However I think it is useful to separate them, as
// Conversions should be thought of as "a mapping from Types to Types", and
// Codecs as "encoding Types into bytes". The cognitive difference seems
// worthwhile to highlight.

function Codec(src, encode, decode) {
  if (src instanceof Codec)
    return src;

  if (!(this instanceof Codec))
    return new Codec(src, code, decode);

  src = Object(src, codec_defaults);

  this.src = src;
  this.encode = encode || identity;
  this.decode = decode || identity;
}

function identity(a) { return a; }
