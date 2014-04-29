var Type = require('../type');

//TODO: move this to date-type.jsonld once loader does this.
var DateType = module.exports = new Type({
  '@id': 'transformer/date',
  'codec': 'iso-date',
  'schema': 'string',
});
