#!/usr/bin/env node

var rw = require('rw');
var S = require('string');
var _ = require('underscore');
var resolve = require('resolve');
var npmDir = require('npm-dir');
var transformer = require('./');
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
  # in this directory\n\
  npm install <%= modules.join(' ') %>\n\
\n\
  # globally (you may need to sudo)\n\
  npm install -g <%= modules.join(' ') %>\n\
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


function main() {

  // set options.
  transformer.load.autoInstall = argv.install;

  if (argv.src) { // is it print src?
    print_src(argv.src);
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
