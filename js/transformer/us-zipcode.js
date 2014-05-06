var Type = require('../type');

module.exports = new Type({
  // @context and type filled in automatically.
  'id': 'us-zipcode',
  'description': 'A zipcode in the U.S.A.',
  'schema': 'string',
});
