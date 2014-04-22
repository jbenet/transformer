var transformer = require('transformer');

var DateType = module.exports = new transformer.Type({
  '@id': 'transformer/date',
  'schema': 'string',
});


// iso is native date encoding. this is here just in case that changes.
var ISODateCodec = new transformer.Codec({
  '@id': 'transformer/date-iso-codec'
})

ISODateCodec.encode = function(str) {
  return str
}

ISODateCodec.decode = function(raw) {
  return raw
}


var UnixTimeCodec = new transformer.Codec({
  '@id': 'transformer/date-unixtime-codec'
})

UnixTimeCodec.encode = function(str) {
  var d = new Date(str);
  return d.getTime() / 1000.0; // Date uses ms, not s.
}

UnixTimeodec.decode = function(raw) {
  var d = new Date(raw * 1000.0) // Date uses ms, not s.
  return d.toIsoString();
}



// toISOString
(function() {

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

})();
