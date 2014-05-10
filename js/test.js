var _ = require('underscore');
var fs = require('fs');
var rw = require('rw');
var Loader = require('./loader');
var Object = require('./object');
var Conversion = require('./conversion');
var Type = require('./type');
var test = require('tape');

var T = module.exports = function() {
  // run internal transformer tests here.
}

T.conversion = function(conv, io) {

  test('conversion can be loaded', function (t) {
    t.is(conv, Loader(conv.src.id), 'loaded');
    t.end();
  });

  test('conversion func signature', function (t) {
    if (conv.async) {
      t.is(conv.convert.length, 2, 'async (input, callback)');
    } else {
      t.is(conv.convert.length, 1, 'sync (input)');
    }
    t.end();
  });

  test('package.json is setup correctly', function (t) {
    var pkg = readSyncJson('./package.json');
    t.is(pkg.name, 'transformer.' + conv.src.id, 'pkg.name');
    t.is(pkg.transformer, 'transformer.jsonld', 'pkg.transformer');
    t.is(pkg.scripts.test, 'test.js', 'pkg.test');
    t.ok(_.contains(pkg.keywords, 'transformer'), 'pkg.keywords 1');
    t.ok(_.contains(pkg.keywords, 'transformer-conversion'), 'pkg.keywords 2');
    t.end();
  });

  test('transformer.jsonld is setup correctly', function (t) {
    var tj = readSyncJson('./transformer.jsonld');
    t.is(tj["@context"], Object.contextUrl, 'context url');
    t.is(tj.type, 'conversion', 'type is conversion');
    t.is(tj.id, conv.src.id, 'id matches');
    t.is(tj.description, conv.src.description, 'description matches');
    // t.deepEquals(tj.schema, conv.src.schema); // type
    t.deepEquals(tj, conv.src, 'whole src matches');
    t.end();
  });

  // patch in a utility conversion test.
  test.converts = function(t, conv, input, output) {
    var wconv = Conversion.valueWrap(conv);
    t.deepEquals(conv.convert(input), output, 'raw conversion');
    t.deepEquals(wconv(input), output, 'wrapped conversion');
  }

  test('conversion works - ' + conv.src.id, function(t) {
    // test each provided io pair.
    io.forEach(function (pair) {
      test.converts(t, conv, pair[0], pair[1]);
    });
    t.end();
  });

  // return test in case user wants to run own tests too.
  return test;
}

function readSyncJson(filename) {
  return JSON.parse(rw.readSync(filename, 'utf-8'));
}
