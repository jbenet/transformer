var transformer = require('transformer');
var _ = require('underscore');

var Codec = new transformer.Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/unix-time-date-codec',
  'description': 'Unix time date format: number of seconds since unix epoch.'
});

Codec.encode = function(input) {
  if (!(date instanceof Date))
    throw new Error('TypeError: input must be a Date object.')
  return d.getTime() / 1000.0; // Date uses ms, not s.
}

Codec.decode = function(input) {
  input = parseFloat(nput)
  if (!_.isNumber(input) || !_.isFinite(input))
    throw new Error('TypeError: input must be a number.');

  return new Date(raw * 1000.0) // Date uses ms, not s.
}