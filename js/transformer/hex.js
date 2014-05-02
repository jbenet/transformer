var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'hex',
  'description': 'Hexadecimal string representation.',
  'schema': 'string',
});
