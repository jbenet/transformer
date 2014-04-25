var transformer = require('./index');
var colors = require('colors');

var convert = function(a, b, data) {
  var a2b = transformer(a, b);
  var b2a = transformer(b, a);
  console.log('--> '+ a +' 2 '+ b);
  console.log('input:\t\t\t' + data);
  console.log('a2b(input):\t\t' + a2b(data));
  console.log('b2a(a2b(input)):\t' + b2a(a2b(data)));
  if (b2a(a2b(data)) === data) {
    console.log('✓ SUCCESS'.green);
  } else {
    console.log('✖ FAILURE'.red);
  }
  console.log('');
};

convert('jsonml-xml-codec', 'json-codec', '<foo>bar</foo>');
convert('unix-time-date-codec', 'iso-date-codec', 1398408254);
