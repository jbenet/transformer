var _ = require('underscore');
var Object = require('./object');
var Type = require('./type');
var Value = require('./value');
var coerce = require('./coerce');

module.exports = Conversion

var conversion_defaults = {
  'type': 'Conversion',
  // 'invertible': true,
  'input': [],
  'output': []
}

// A Conversion is one of the two Transformer objects.
// Conversions are functions that map from one set of Types to another.
// They "transform" source types into target types.

// Some Conversions are invertible -- meaning they are one-to-one and can be
// "undone" or reverted (e.g. email-ddress <---> mailto-url). This is only
// when there is no information loss.

// Other Conversions are lossy -- meaning reduce information, are one-way,
// and cannot be "undone" perfectly (e.g. us-street-address ---> us-zip-code).


// Implementation Details:
// new Conversion(...) returns a function that:
// - can be applied to a 'Value'
// - has information regarding the real conversion.



function Conversion(func, src, inType, outType) {
  if (src instanceof Conversion)
    return src;

  if (!(this instanceof Conversion))
    return new Conversion(inType, outType);

  src = Object(src || {}, conversion_defaults);

  // instantiate types.
  inType = coerce(inType)
  outType = coerce(outType)

  // get type ids
  src.input = inType.src.id;
  src.output = outType.src.id;
  src.description = src.description || src.input +' to '+ src.output;

  // if we have a 'mapping' key (relation) attempt to create func.
  if (!func && src['mapping']) {
    func = Conversion.convertFromSchema(src);
  }

  // return a different object, one that can be applied directly.
  conv = function (input) {
    var output = func(input.value); // execute the conversion
    return new Value(outType, output);
  };

  // label the function so it is printed meaningfully
  conv.name = src.id;
  conv.convert = func;
  conv.src = src;
  conv.inType = inType;
  conv.outType = outType;
  return conv;
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

Conversion.withTypes = function(t1, t2) {

  function loadConversion(t1, t2) {
    return coerce(t1.src.id + '-to-'+ t2.src.id);
  }

  try {
    return loadConversion(t1, t2);
  } catch (e1) {

    // if no conversion exists, try to figure it out.
    if (e1.code == 'MODULE_NOT_FOUND') {
      if (t1.src.schema == t2.src.id ||
          t2.src.schema == t1.src.id ||
          t1.src.schema == t2.src.schema ||
          t1.src.id == t2.src.id) {
        return function (d) { return d };
      }
    }
    throw e1;
  }

  /*
  // Symmetric Loading
  // try loading both modules, a2b and b2a, optimistically.
  try {
    return loadConversion(t1, t2);

  } catch (e1) {
    // if not found, try the reverse
    if (e1.code == 'MODULE_NOT_FOUND') {
      try {
        // if func is invertible, return it! yay!
        var m2to1 = loadConversion(t2, t1);
        if (m2to1.invertible) {
          m2to1.invert(); // hack. find a better way to do this.
          return m2to1;
        }

      } catch (e2) {
        // if e2 is some other err, we want to see it. propagate it up.
        if (e2.code != 'MODULE_NOT_FOUND')
          throw e2; // some other error
        // otherwise, we want to signal the first module wasn't found.
      }
    }

    // either it was handled already, or we're throwing the first error.
    // this is either because neither module was found, or it was another err.
    throw e1;
  }

  throw new Error('should never get here');
  */
};

// Conversion.Identity = new Conversion(function(d) { return d; }, {
//   'id': 'identity',
// }, [Type], [Type]);
