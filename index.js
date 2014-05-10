var Type = require('./js/type');
var Value = require('./js/value');
var Object = require('./js/object');
var Conversion = require('./js/conversion');
var Loader = require('./js/loader');
var coerce = require('./js/coerce');
var apiSync = require('./js/apiSync');
var apiAsync = require('./js/apiAsync');
var test = require('./js/test');

var transformer = module.exports = apiSync;

transformer.sync = apiSync;
transformer.async = apiAsync;

transformer.coerce = coerce;
transformer.load = Loader;
transformer.Type = Type;
transformer.Conversion = Conversion;
transformer.Loader = Loader;
transformer.contextUrl = Object.contextUrl;
transformer.test = test;
