var transformer = require('./index');
var colors = require('colors');

var log = console.log;

var convert = function(a, b, data) {
  var a2b = transformer(a, b);
  var b2a = transformer(b, a);
  log('--> '+ a +' 2 '+ b);
  log('input:\t\t\t' + data);
  log('a2b(input):\t\t' + a2b(data));
  log('b2a(a2b(input)):\t' + b2a(a2b(data)));
  if (b2a(a2b(data)) === data) {
    log('✓ SUCCESS'.green);
  } else {
    log('✖ FAILURE'.red);
  }
  log('');
};

convert('jsonml-xml-codec', 'json-codec', '<foo>bar</foo>');
convert('unix-time-date-codec', 'iso-date-codec', 1398408254);
