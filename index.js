var Type = require('transformer-type');
var Conversion = require('transformer-conversion');
var compose = require('transformer-compose');
var resolve = require('transformer-resolve');
var loader = require('transformer-loader');

var transformer = module.exports = transformerSync;

transformer.sync = transformerSync;
transformer.async = transformerAsync;

transformer.load = loader;
transformer.compose = compose;
transformer.resolve = resolve;
transformer.Type = Type;
transformer.Conversion = Conversion;
transformer.contextUrl = Type.Object.contextUrl;

function transformerSync() {
  switch (arguments.length) {
  case 0:
    throw new Error('transformer error: no arguments.')
  case 1: // Load it
    return loader(arguments[0]);
  default:
    var conversions = resolve(_.toArray(arguments))
    return compose(conversions)
  }
}

function transformerAsync() {
  switch (arguments.length) {
  case 0:
    throw new Error('transformer error: no arguments.')
  case 1: // no loading anymore. should be an obj.
    return arguments[0];
  default:
    var conversions = resolve(_.toArray(arguments))
    return compose.async(conversions)
  }
}
