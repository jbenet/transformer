var t = require('./index');
var json2xml = t('json-codec', 'jsonml-xml-codec');
var xml2json = t('jsonml-xml-codec', 'json-codec');
var xmlstr = '<foo>bar</foo>'
console.log(xmlstr + ' // xmlstr');
console.log(xml2json(xmlstr) + '  // xml2json(xmlstr)');
console.log(json2xml(xml2json(xmlstr)) + ' // json2xml(xml2json(xmlstr))');
