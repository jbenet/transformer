var S = require('string');
var _ = require('underscore');
var Object = require('./object');
var Loader = require('./loader');
var Type = require('./type');
var Value = require('./value');
var coerce = require('./coerce');
var defer = require('./defer');

module.exports = Conversion

var conversion_defaults = {
  'type': 'conversion',
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



function Conversion(inType, outType, func, src) {

  // coercing call?
  if (arguments.length == 1 && inType instanceof Conversion)
      return src;

  // want to inherit prototype
  if (!(this instanceof Conversion))
    return new Conversion(inType, outType, func, src);

  // instantiate types.
  inType = coerce(inType)
  outType = coerce(outType)

  // setup id if not given
  src = _.extend({}, src); // copy + default.
  src.id = Conversion.idWithTypes(inType, outType);

  // if it has been seen before, return that.
  if (src && Conversion.all[src])
    return Conversion.all[src];

  if (src && src.id && Conversion.all[src.id])
    return Conversion.all[src.id];

  // setup object src with defaults
  src = Object(src, conversion_defaults);

  // get type ids
  src.input = inType.src.id;
  src.output = outType.src.id;
  src.description = src.description || src.input +' to '+ src.output;
  if (src.async)
    src.async = true; // force boolean. default is async = false.

  // if we have a 'mapping' key (relation) attempt to create func.
  if (!func && src['mapping']) {
    func = Conversion.convertFromSchema(src);
  }

  if (!func)
    throw new Error('Conversion requires a function.');

  // label the function so it is printed meaningfully
  func.name = src.id;
  func.id = src.id;

  // return a different object, one that can be applied directly.
  var wrap = (src.async ? convertAsyncWrap : convertSyncWrap);
  var conv = wrap(func, outType);
  conv.name = src.id + '.wrapper';
  conv.type = Conversion;
  conv.convert = func;
  conv.src = src;
  conv.inType = inType;
  conv.outType = outType;
  conv.async = src.async;
  func.async = src.async;
  Conversion.all[conv.src.id] = conv;
  Loader.cache[conv.src.id] = conv;
  return conv;
}

Conversion.all = {};

function notImplemented() {
  throw new Error('Conversion not implemented.');
}

function uninvertible() {
  throw new Error('Uninvertible conversion inversion invoked.');
}

Conversion.idWithTypes = function(t1, t2) {
  if (t1.src && t1.src.id)
    t1 = t1.src.id

  if (t2.src && t2.src.id)
    t2 = t2.src.id

  if (!(_.isString(t1) && _.isString(t2)))
    throw new Error('type ids should be strings');

  return t1 + '-to-' + t2;
};

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
    if (Loader.errIsModuleNotFound(e1)) {
      if (t1.src.schema == t2.src.id ||
          t2.src.schema == t1.src.id ||
          t1.src.schema == t2.src.schema ||
          t1.src.id == t2.src.id) {
        return Conversion.Identity(t1, t2);
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


Conversion.Identity = function identityConversion(tFrom, tTo) {
  return new Conversion(tFrom, tTo, function(d) { return d; });
};

Conversion.pathIds = function conversionPathIds(types) {
  var pairs = _.zip(types.slice(0, types.length - 1), types.slice(1));
  return _.map(pairs, function(pair) {
    return pair[0] +'-to-'+ pair[1];
  });
}

Conversion.path = function conversionPath(types) {
  var pairs = _.zip(types.slice(0, types.length - 1), types.slice(1));
  return _.map(pairs, function(pair) {
    return Conversion.withTypes(pair[0], pair[1]);
  });
}

Conversion.valueWrap = function(conversion) {
  if (conversion.async)
    return Value.wrapAsync(conversion.inType, conversion);
  else
    return Value.wrapSync(conversion.inType, conversion);
}

function convertSyncWrap(func, outType) {
  if (func.length != 1) {
    throw new Error('sync conversion '+ func.id
      + ' should take 1 arg (input):\n' + func);
  }

  return function (input) {
    return new Value(outType, func(input.value));
  }
}

function convertAsyncWrap(func, outType) {
  if (func.length != 2) {
    throw new Error('async conversion '+ func.id
      + ' should take 2 args (input, callback):\n' + func);
  }

  return function (input, callback) {
    if (!callback)
      throw new Error('Callback required. Async conversion ' + func.id);

    func(input.value, function(err, output) {
      // want to defer here, because user may not.
      if (err) {
        e = 'transformer conversion error in ' + func.id + '.\n'
        if (!(err instanceof Error)) {
          e += '  First callback param is neither null or Error.\n';
          e += '  Maybe calls `callback(out)` instead of';
          e += ' `callback(null, output)` ? \n';
        }
        defer(callback, new Error(e + err.toString()));
      } else {
        defer(callback, null, new Value(outType, output));
      }
    });

    return new Error("This is an async conversion. Use callbacks.");
  };
}
