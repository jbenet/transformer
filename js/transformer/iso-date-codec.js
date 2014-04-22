var transformer = require('transformer');
var _ = require('underscore');

// iso is the native date codec.
var Codec = new transformer.Codec({
  // @context and @type filled in automatically.
  '@id': 'transformer/iso-date-codec',
  'description': 'ISO 8601 date format: 2006-01-02T15:04:05Z07:00'
});

Codec.encode = function(input) {
  if (!(date instanceof Date))
    throw new Error('TypeError: input must be a Date object.')
  return input.
}

Codec.decode = function(input) {
  if (!_.isString(input))
    throw new Error('TypeError: input must be a String.')
  return input
}

// polyfill the toISOString function
if (!Date.prototype.toISOString) {
  function pad(number) {
    var r = String(number);
    if ( r.length === 1 ) {
      r = '0' + r;
    }
    return r;
  }

  Date.prototype.toISOString = function() {
    return this.getUTCFullYear()
      + '-' + pad( this.getUTCMonth() + 1 )
      + '-' + pad( this.getUTCDate() )
      + 'T' + pad( this.getUTCHours() )
      + ':' + pad( this.getUTCMinutes() )
      + ':' + pad( this.getUTCSeconds() )
      + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) )
        .slice( 2, 5 )
      + 'Z';
  };
}
