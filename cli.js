#!/usr/bin/env node

var rw = require('rw');
var path = require('path')
var transformer = require(__dirname);

var log = console.log;

var usage = function() {
  var n = process.argv[1];
  log('Usage: ' + n + ' <in-type-id> <out-type-id> < <in-file> > <out-file>');
};

var in_id = process.argv[2];
var out_id = process.argv[3];

if (!(in_id && out_id)) {
  usage();
  process.exit(-1);
}

var in2out = transformer(in_id, out_id);

// for now use rw module with Sync. TODO: streams.
var input = rw.readSync('/dev/stdin', 'utf8');
var output = in2out(input);
rw.writeSync('/dev/stdout', '' + output, 'utf8');
