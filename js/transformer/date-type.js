var path = require('path');
var transformer = require('transformer');

//TODO: move this to date-type.jsonld once loader does this.
var DateType = module.exports = new transformer.Type({
  '@id': 'transformer/date',
  'codec': 'iso-date-codec',
  'schema': 'string',
});
