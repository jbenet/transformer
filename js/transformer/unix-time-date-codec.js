var _ = require('underscore');
var path = require('path');
var Codec = require(path.join(__dirname, '..', 'codec'));

var UTDCodec = module.exports = new Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/unix-time-date-codec',
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
