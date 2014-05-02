var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'base64',
  'description': 'base64 encoding data into ascii.',
  'schema': 'string',
});
