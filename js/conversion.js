var _ = require('underscore');

module.exports = Conversion

var conversion_defaults = {
  '@context': 'http://transformer.io/context/transformer.jsonld',
  '@type': 'Conversion',
  'invertible': true,
  'input': [],
  'output': []
}

function Conversion(src, inTypes, outTypes) {
  if (!(this instanceof Conversion))
    return new Conversion(inTypes, outTypes);


  // make sure src is legit
  if (!_.isObject(src))
    throw new Exception('TypeError: expected Type object. ' + src)

  if (!_.isString(src["@id"]) || !(src["@id"].length > 0))
    throw new Exception('id must be a nonempty string. Got '+id);


  // copy for modification
  src = _.extend({}, codec_defaults, src)

  // make sure types are objects
  if (!_.isArray(inTypes) || !_.isArray(outTypes))
    throw new Exception('TypeError: expected arrays.')

  inTypes = _.map(inTypes, Type)
  outTypes = _.map(outTypes, Type)

  src.input = _.map(inTypes, function(T) {return T.src['@id']});
  src.output = _.map(outTypes, function(T) {return T.src['@id']});

  this.src = src;
  this.inTypes = inTypes;
  this.outTypes = outTypes;
  this.convert = notImplemented;
  this.invert = (src['invertible'] ? notImplemented : uninvertible);
}

function notImplemented() {
  throw new Error('Conversion not implemented.');
}

function uninvertible() {
  throw new Error('Uninvertible conversion inversion invoked.');
}
