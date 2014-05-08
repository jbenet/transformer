var _ = require('underscore');
var Object = require('./object');
var Type = require('./type');

module.exports = Value

// A Value is a sort of "transport" object that represents an instance
// of a type. Meaning, it is a (Type, data) pair. For example:
//
//   var myip = Value(IPAddress, '127.0.0.1');
//   myip.type == IPAddress
//   myip.value == '127.0.0.1'
//
// Values help us move data around across conversion functions.
// They "wrap" the real value because: the real value _should not_ be
// modified at all by us (only by conversion functions), and yet we need
// to associate a value with its type.

function Value(type, value) {
  this.type = type;
  this.value = value;
};

Value.wrapSync = function valueWrapSync(from, func) {
  return function(input) {
    input = new Value(from, input);
    return func(input).value;
  };
};

Value.wrapAsync = function valueWrapAsync(from, func) {
  return function(input, callback) {
    input = new Value(from, input);
    func(input, function(err, output) {
      if (err) callback(err);
      else callback(null, output.value);
    });
  };
};

Value.prototype.typeCheck = function valueTypeCheck() {
  return Type.check(this.type, this.value);
};
