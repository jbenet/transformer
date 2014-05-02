var _ = require('underscore');
var Codec = require('../codec');

var UTDCodec = module.exports = new Codec({
  // @context and type filled in automatically.
  'id': 'unix-time',
  'description': 'Unix time date format: number of seconds since unix epoch.'
});

UTDCodec.encode = function(date) {
  if (!(date instanceof Date))
    throw new Error('TypeError: obj must be a Date object.')
  return date.getTime() / 1000.0; // Date uses ms, not s.
}

UTDCodec.decode = function(raw) {
  num = parseFloat(raw)
  if (!_.isNumber(num) || !_.isFinite(num))
    throw new Error('TypeError: input must be a number.');

  return new Date(num * 1000.0) // Date uses ms, not s.
}
