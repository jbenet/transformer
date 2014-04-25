var path = require('path');
var Loader = require(path.join(__dirname, '..', 'loader'));

// XML is not directly importable to json. you have to pick something
// more concrete, like jsonml-xml-codec, or sax-xml-codec.

module.exports = Loader('jsonml-xml-codec')
