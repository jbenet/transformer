var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'buffer',
  'description': 'Byte buffer representation.',
  'schema': 'Buffer',
});

module.exports.Buffer = Buffer;
