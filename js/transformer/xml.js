var Loader = require('../loader');

// XML is not directly importable to json. you have to pick something
// more concrete, like jsonml-xml-codec, or sax-xml-codec.

module.exports = Loader('jsonml')
