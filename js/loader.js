var _ = require('underscore');
var install = require('npm-installer');
module.exports = Loader;

// id format: <namespace>/<name>

function Loader(id) {
  if (!_.isString(id) || !(id.length > 0))
    throw new Error('id must be a nonempty string. Got '+id);

  // no longer namespacing-- conversions get weird.
  // if (id.search('/') == -1)
  //   id = 'transformer/' + id

  if (!Loader.cache[id])
    Loader.cache[id] = Loader.LoadId(id)
  return Loader.cache[id]
}

Loader.cache = {}
Loader.autoInstall = false;

Loader.LoadId = function(id) {
  return require('./transformer/'+id);

  // try npm -- worry about this later.
  // return Loader.LoadFromNpm(id);
}

Loader.LoadFromNpm = function (id) {
  name = Loader.NpmName(id)

  // worry about this later.
  // if (Loader.autoInstall) {
  //   install(argv.install)
  // };

  return require(name);
}

Loader.InstallFromNpm = function(npmName) {
  if (!npmName)
    throw new Error('install requires valid npmName');

  install(npmName, function(err, data) {
    if (err) throw err;
    callback(data);
  });
}

Loader.Npmize = function(id) {
  return id.toLowerCase().replace('/', '-');
}

Loader.NpmName = function(id) {
  return 'transformer.' + Loader.Npmize(id);
}

/*
// types: transformer-type-<type>
// conversions: transformer-<type>-to-<type>
Loader.NpmName = function(id, type) {
  name = id.split('/')[1]
  switch (type) {
  case 'Type':
    return 'transformer-type-' + name
  case 'Conversion':
    return 'transformer-' + name
  }
  throw new Error('Transformer npm name: unknown type.')
}
*/
