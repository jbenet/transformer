var _ = require('underscore');
var path = require('path');
var Codec = require(path.join(__dirname, '..', 'codec'));

var UTDCodec = module.exports = new Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/unix-time-date-codec',
  'description': 'Unix time date format: number of seconds since unix epoch.'
});

UTDCodec.encode = function(input) {
  if (!(date instanceof Date))
    throw new Error('TypeError: input must be a Date object.')
  return d.getTime() / 1000.0; // Date uses ms, not s.
}

UTDCodec.decode = function(input) {
  input = parseFloat(nput)
  if (!_.isNumber(input) || !_.isFinite(input))
    throw new Error('TypeError: input must be a number.');

  return new Date(raw * 1000.0) // Date uses ms, not s.
}
