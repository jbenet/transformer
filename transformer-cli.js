#!/usr/bin/env node
var install = require('transformer-installer')
var moduleCheck = require('./module-check')
// var compile = require('transformer-compiler')
var transformer = require('./');
var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['g', 'global'],
});

var useGlobal = argv.g || argv.global
var log = console.log;

function usage() {
  var n = process.argv[1];
  log('Usage: transformer [<flags>] <subcommand>')
  log('')
  log('Subcommands:')
  log('')
  log('    src <id>            - print transformer description')
  log('    install [-g] <ids>  - install transformers')
  log('')
};

function src(id, useGlobal) {
  var m = transformer.loader(id, useGlobal);
  log(JSON.stringify(m.src, undefined, 1));
}


function main() {
  if (argv._.length < 2) {
    usage()
    process.exit(-1)
  }

  // set global resolution if wanted.
  transformer.resolve.useGlobalModules(argv.g || argv.global)

  // set options.
  var command = argv._[0].toLowerCase()
  switch (command) {
  case 'install': return install(argv._.slice(1), useGlobal)
  case 'compile': return compile(argv._.slice(1), useGlobal)
  case 'src': return src(argv._[1], useGlobal)
  }

  usage()
}


// run main safely.
moduleCheck.catchMissingModulesErr(main)
