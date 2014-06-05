#!/usr/bin/env node

var rw = require('rw');
var S = require('string');
var _ = require('underscore');
var npmResolve = require('resolve');
var npmDir = require('npm-dir');
var argv = require('minimist')(process.argv.slice(2));

var install = require('transformer-installer')
var transformer = require('./');

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

  // resolve ids -> conversion
  var conversions = transformer.resolve(ids)

  // transformer chain
  if (argv["sync"]) {
    console.log("using sync");
    var in2out = transformer.compose.sync(conversions);
    write(in2out(read()));

  } else {
    var in2out = transformer.compose.async(conversions);
    in2out(read(), function(err, output) {
      if (err) throw err;
      write(output);
    });
  }

}

function handleRequiresModulesError(ids) {
  log(install.explanation(ids))
  process.exit(-1)
}

function ensureModulesAreInstalled(ids) {
  missing = transformer.load.missingModules(ids)
  if (missing.length > 0)
    handleRequiresModulesError(missing)
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
      var res = npmResolve.sync(name, { basedir: npmDir.dir });
      if (res) {
        return require(res);
      }
    }

    // otherwise error out
    throw e;
  }
}

function main() {

  // set options.
  transformer.load.autoInstall = argv.install;

  if (argv.src) { // is it print src?
    print_src(argv.src);
  }
  else if (argv.install) {
    install(argv._, (argv.g || argv.global));
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
