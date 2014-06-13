#!/usr/bin/env node
var map = require('lodash.map')
var resolve = require('transformer-resolve')
var install = require('transformer-installer')
var compile = require('transformer-compile')
var moduleCheck = require('./module-check')
// var compile = require('transformer-compiler')
var transformer = require('./');
var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['g', 'global', 'async'],
});

var useAsync = argv.async
var useGlobal = argv.g || argv.global
var log = console.log;

function usage() {
  var n = process.argv[1];
  log('Usage: transformer [<flags>] <subcommand> [<args>]')
  log('')
  log('Subcommands:')
  log('')
  log('    src <id>              print transformer description')
  log('    install [-g] <ids>    install transformers')
  log('    resolve [-g] <ids>    resolve types to conversions between them')
  log('    compile [-g] <ids>    resolve types and compile conversion pipeline')
  log('')
  log('Flags:')
  log('')
  log('    -g, --global          install and use global node_modules, instead of local')
  log('')
};

function src(id, useGlobal) {
  var m = transformer.loader(id, useGlobal)
  return JSON.stringify(m.src, undefined, 1)
}

function resolveIds(types, useGlobal) {
  // first ensure the types are installed
  moduleCheck.ensureModulesAreInstalled(types, useGlobal)

  return map(resolve(types, useGlobal), function(c) {
    return c.src.id
  }).join('\n')
}

function main() {
  if (argv._.length < 2) {
    usage()
    process.exit(-1)
  }

  // set options.
  var command = argv._[0].toLowerCase()
  var rest = argv._.slice(1)
  switch (command) {
  case 'install': return log(install(rest, useGlobal))
  case 'resolve': return log(resolveIds(rest, useGlobal))
  case 'compile': return log(compile(resolve(rest, useGlobal), useAsync))
  case 'src': return log(src(rest[0], useGlobal))
  }

  usage()
}


// run main safely.
moduleCheck.catchMissingModulesErr(main)
