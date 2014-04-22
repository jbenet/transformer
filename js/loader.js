var path = require('path');
var _ = require('underscore');
module.exports = Loader;

// id format: <namespace>/<name>

function Loader(id) {
  if (!_.isString(id) || !(id.length > 0))
    throw new Error('id must be a nonempty string. Got '+id);

  if (id.search('/') == -1)
    id = 'transformer/' + id

  if (!Loader.cache[id])
    Loader.cache[id] = Loader.LoadId(id)
  return Loader.cache[id]
}

Loader.cache = {}


Loader.LoadId = function(id) {

  parts = id.split('/');
  namespace = parts[0];
  name = parts[1];

  if (namespace == 'transformer') {
    // should be in stdlib
    filename = name + '.js'
    return require(path.join(__dirname, 'transformer', filename));
  }

  // try npm
  return Loader.LoadFromNpm(id);
}


Loader.LoadFromNpm = function (id) {
  name = Loader.NpmName(id)
  return require(name);
}

Loader.NpmName = function(id) {
  return 'transformer-' + id.toLowerCase().replace('/', '-');
}

/*
// types: transformer-type-<type>
// codecs: transformer-codec-<name>
// conversions: transformer-<type>-to-<type>
Loader.NpmName = function(id, type) {
  name = id.split('/')[1]
  switch (type) {
  case 'Type':
    return 'transformer-type-' + name
  case 'Codec':
    return 'transformer-codec-' + name
  case 'Conversion':
    return 'transformer-' + name
  }
  throw new Error('Transformer npm name: unknown type.')
}
*/
