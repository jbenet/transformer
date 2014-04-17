var _ = require('underscore');

module.exports = Conversion

var conversion_defaults = {
  '@context': 'http://pandat.io/context/pandat.jsonld',
  '@type': 'Conversion',
  'invertible': true,
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


  this.src = src;
  this.inTypes = inTypes;
  this.outTypes = outTypes;
  this.convert = notImplemented;
  this.invert = (src['invertible'] ? notImplemented : uninvertible);
}

function notImplemented() {
  throw new Exception('Conversion not implemented.');
}

function uninvertible() {
  throw new Exception('Uninvertible conversion inversion invoked.');
}
