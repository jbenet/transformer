var _ = require('underscore');
var Object = require('./object');
var Type = require('./type');

module.exports = Conversion

var conversion_defaults = {
  '@type': 'Conversion',
  'invertible': true,
  'input': [],
  'output': []
}

// A Conversion is one of the three Transformer kinds.
// Conversions are functions that map from one set of Types to another.
// They "transform" source types into target types.

// Some Conversions are invertible -- meaning they are one-to-one and can be
// "undone" or reverted (e.g. email-ddress <---> mailto-url). This is only
// when there is no information loss.

// Other Conversions are lossy -- meaning reduce information, are one-way,
// and cannot be "undone" perfectly (e.g. us-street-address ---> us-zip-code).

function Conversion(src, inTypes, outTypes) {
  if (src instanceof Conversion)
    return src;

  if (!(this instanceof Conversion))
    return new Conversion(inTypes, outTypes);

  src = Object(src, conversion_defaults);

  // make sure types are objects
  if (!_.isArray(inTypes) || !_.isArray(outTypes))
    throw new Error('TypeError: expected arrays.')

  inTypes = _.map(inTypes, Type)
  outTypes = _.map(outTypes, Type)

  // get type ids
  src.input = _.map(inTypes, function(T) {return T.src['@id']});
  src.output = _.map(outTypes, function(T) {return T.src['@id']});

  this.src = src;
  this.inTypes = inTypes;
  this.outTypes = outTypes;
  this.convert = notImplemented;
  this.invert = (src['invertible'] ? notImplemented : uninvertible);

  // if we have a 'mapping' key (relation) attempt to create funcs.
  if (src['mapping']) {
    funcs = Conversion.convertFromSchema(src);
    this.convert = funcs['convert'] || this.convert;
    this.invert = funcs['invert'] || this.invert;
  }

  return this
}

function notImplemented() {
  throw new Error('Conversion not implemented.');
}

function uninvertible() {
  throw new Error('Uninvertible conversion inversion invoked.');
}

Conversion.convertFromSchema = function(src) {
  if (!src['mapping'])
    throw new Error('no mapping in conversion schema.');

  // here, we'll construct a conversion function (and inverse if possible)
  // from a schema specifying a relational mapping. For example:
  //
  //  {'mapping': {'key_in_output': 'key_in_input'}}
  //
  throw new Error('NOT YET IMPLEMENTED');
}
