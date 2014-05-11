#!/usr/bin/env node

var rw = require('rw');
var S = require('string');
var _ = require('underscore');
var resolve = require('resolve');
var npmDir = require('npm-dir');
var transformer = require('./');
var search = require('./js/search');
var exec = require('child_process').exec;
var argv = require('minimist')(process.argv.slice(2));

var log = console.log;

function usage() {
  var n = process.argv[1];
  log('Usage: ' + n + ' <in-type-id> <out-type-id> < <in-file> > <out-file>');
};

function print_src(id) {
  var m = transformer.load(argv.src);
  log(JSON.stringify(m.src, undefined, 1));
}

function convert(ids) {
  if (!(ids.length > 1)) {
    usage();
    process.exit(-1);
  }

  // wrap with string (because cli)
  ids.unshift('string');
  ids.push('string');

  var convs = []; // transformer.Conversion.pathIds(ids);
  ensureModulesAreInstalled(ids.concat(convs));

  // for now use rw module with Sync. TODO: streams.
  var read = function() {
    return rw.readSync('/dev/stdin', 'utf8').trim();
  }

  var write = function(output) {
    rw.writeSync('/dev/stdout', '' + output + '\n', 'utf8');
  }

  // transformer chain
  if (argv["sync"]) {
    console.log("using sync");
    var in2out = transformer.sync.compose(ids);
    write(in2out(read()));

  } else {
    var in2out = transformer.async.compose(ids);
    in2out(read(), function(err, output) {
      if (err) throw err;
      write(output);
    });
  }

}

function handleRequiresModulesError(ids) {
  var tmpl = _.template("Error: transformer needs the following npm modules to perform this conversion:\n\
<% _.each(ids, function(m) { %>\n\
  - <%= m %>\
<% }); %>\n\
\n\
To install them, run:\n\
\n\
  # locally, to be used within this directory\n\
  transformer --install <%= ids.join(' ') %>\n\
\n\
  # globally, to be used everywhere in your system (you may need to sudo)\n\
  transformer --install -g <%= ids.join(' ') %>\n\
\n\
");

  var modules = _.map(ids, transformer.load.NpmName);
  log(tmpl({ ids: ids, modules: modules }));
  process.exit(-1);
}

function ensureModulesAreInstalled(ids) {
  missing = _.unique(_.filter(ids, function(id) {
    try {
      // load. if no exception, it succeeded.
      transformer(id);
      return false;
    } catch (e) {
      if (transformer.load.errIsModuleNotFound(e))
        return true;
      throw e;
    }
  }));

  if (missing.length > 0)
    handleRequiresModulesError(missing);
}


// patch transformer.load to use special loading.
// cli needs to handle special cases.
// See https://github.com/jbenet/transformer/issues/15
transformer.load.LoadId = function(id) {
  var name = transformer.load.NpmName(id)
  try {
    return require(name);
  } catch (e) {

    // try global installation
    if (transformer.load.errIsModuleNotFound(e)) {
      var res = resolve.sync(name, { basedir: npmDir.dir });
      if (res) {
        return require(res);
      }
    }

    // otherwise error out
    throw e;
  }
}

function npmModulesToInstall(ids) {
  var install = []
  _.each(ids, function(m) {
    // if last is not conversion, add conversion in between
    var last = _.last(install);
    if (last && !last.match(/-to-/)) {
      install.push(transformer.Conversion.idWithTypes(last, m));
    }

    install.push(m);
  });

  // make npm names
  install = _.map(install, transformer.load.NpmName);

  install = _.uniq(install);
  return install;
}

function installModules(modules) {
  // install them.
  var g = (argv.global || argv.g) ? '-g ' : ''
  var cmd = 'npm install ' + g + modules.join(' ');
  log(cmd);
  exec(cmd, function(err, stdout, stderr) {
    if (err) log('install error: ' + err);

    log('');
    log('Installed:');
    _.each(modules, function(m) {
      log('- ' + m);
    })
  });
}

function install(ids) {
  var install = [];
  var modules = npmModulesToInstall(ids);

  search(null, function(err, allModules) {
    if (err) throw err;

    _.map(modules, function(m) {
      if (_.contains(allModules, m))
        install.push(m);
      else
        log('No npm package for: '+m);
    });

    installModules(install);
  });
}

function main() {

  // set options.
  transformer.load.autoInstall = argv.install;

  if (argv.src) { // is it print src?
    print_src(argv.src);
  }
  else if (argv.install) {
    install(argv._);
  }
  else { // seems to be a conversion
    convert(argv._);
  }
}


// run main.
try {
  main();
} catch (e) {
  if (transformer.load.errIsModuleNotFound(e)) {
    var m = stringModuleIds(e.toString());
    handleRequiresModulesError(m);
  } else {
    throw e;
  }
}

function stringModuleIds(str) {
  var re = /transformer\.([a-z0-9-.]+)/ig;
  var matches = [];
  var match;
  while (match = re.exec(str)) {
    matches.push(match[1]);
  }
  return matches;
}
