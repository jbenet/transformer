#!/usr/bin/env node

var rw = require('rw');
var S = require('string');
var _ = require('underscore');
var Loader = require('./js/loader');
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

  // transformer chain
  var in2out = transformer.compose(ids);

  // for now use rw module with Sync. TODO: streams.
  var input = rw.readSync('/dev/stdin', 'utf8').trim(); // could cause bugs...
  in2out(input, function(output) {
    rw.writeSync('/dev/stdout', '' + output + '\n', 'utf8');
  });
}

function handle_requires_modules_error(modules) {
  tmpl = _.template("Error: transformer needs the following npm modules to perform this conversion:\n\
<% _.each(modules, function(m) { %>\n\
  - <%= m %>\n\
<% }); %>\n\
To install them, run:\n\
\n\
  # in this directory\n\
  npm install <%= modules.join(' ') %>\n\
\n\
  # globally (you may need to sudo)\n\
  npm install -g <%= modules.join(' ') %>\n\
\n\
");

  log(tmpl({ modules: modules }));
  process.exit(-1);
}

function main() {

  // set options.
  Loader.autoInstall = argv.install;

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
  if (e.code == 'MODULE_NOT_FOUND') {
    var s = e.toString();
    var s = s.substr(s.search("'")).replace(/'/g, '');
    handle_requires_modules_error([s]);
  } else {
    throw e;
  }
}
