#!/usr/bin/env node
var rw = require('rw');
var map = require('lodash.map');
var moduleCheck = require('./module-check')
var transformer = require('./');
var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['g', 'global', 'sync', 'async'],
});

var useGlobal = argv.g || argv.global
var log = console.log;

function usage() {
  var n = process.argv[1];
  log('Usage: ' + n + ' <in-type-id> <out-type-id> < <in-file> > <out-file>');
};

function convert(ids, useGlobal) {
  if (!(ids.length > 1)) {
    usage();
    process.exit(-1);
  }

  // wrap with string (because cli)
  ids.unshift('string');
  ids.push('string');

  var convs = []; // transformer.Conversion.pathIds(ids);
  moduleCheck.ensureModulesAreInstalled(ids.concat(convs), useGlobal);

  // for now use rw module with Sync. TODO: streams.
  var read = function() {
    return rw.readSync('/dev/stdin', 'utf8').trim();
  }

  var write = function(output) {
    rw.writeSync('/dev/stdout', '' + output + '\n', 'utf8');
  }

  // resolve ids -> conversion
  var conversions = transformer.resolve(ids, useGlobal)

  // transformer chain
  var async = argv["async"]
  map(conversions, function(c) {
    async = async || c.async
  })

  if (!async || argv["sync"]) {
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


function main() {
  // set global resolution if wanted.
  convert(argv._, useGlobal);
}

// run main safely.
moduleCheck.catchMissingModulesErr(main)
