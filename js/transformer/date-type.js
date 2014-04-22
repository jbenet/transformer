var path = require('path');
var Type = require(path.join(__dirname, '..', 'type'));

//TODO: move this to date-type.jsonld once loader does this.
var DateType = module.exports = new Type({
  '@id': 'transformer/date',
  'codec': 'iso-date-codec',
  'schema': 'string',
});
