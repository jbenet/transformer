var Type = require('transformer-type')
var Conversion = require('transformer-conversion')
var loader = require('transformer-loader')
var compose = require('transformer-compose')
var resolve = require('transformer-resolve')

var transformer = module.exports = transformerSync

transformer.sync = transformerSync
transformer.async = transformerAsync

transformer.Type = Type
transformer.Conversion = Conversion
transformer.loader = loader
transformer.compose = compose
transformer.resolve = resolve
transformer.contextUrl = Type.Object.contextUrl

function transformerSync() {
  switch (arguments.length) {
  case 0:
    throw new Error('transformer error: no arguments.')
  case 1: // Load it
    return loader(arguments[0])
  default:
    var conversions = resolve(_.toArray(arguments))
    return compose.sync(conversions)
  }
}

function transformerAsync() {
  switch (arguments.length) {
  case 0:
    throw new Error('transformer error: no arguments.')
  case 1: // Load it
    return loader(arguments[0])
  default:
    var conversions = resolve(_.toArray(arguments))
    return compose.async(conversions)
  }
}
