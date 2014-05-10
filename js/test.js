var _ = require('underscore');
var fs = require('fs');
var rw = require('rw');
var Loader = require('./loader');
var Object = require('./object');
var Conversion = require('./conversion');
var Type = require('./type');

var T = module.exports = function() {
  // only load if we're running tests.
  var test = require('tape');

  // run internal transformer tests here.
}

T.object = function(mod) {
  // only load if we're running tests.
  var test = require('tape');

  test('module can be loaded', function (t) {
    t.is(mod, Loader(mod.src.id), 'loaded');
    t.end();
  });

  test('module exposes a transformer object', function(t) {
    t.ok(_.isObject(mod.src), 'has src');
    t.is(mod.src["@context"], Object.contextUrl, 'src has context');
    t.ok(mod.src.id, 'src has id');
    t.ok(mod.src.type, 'src has type');
    t.ok(mod.src.description, 'src has description');
    t.ok((mod.type === Type  || mod.type === Conversion), 'type obj');
    t.ok((mod.src.type === 'type' || mod.src.type === 'conversion'), 'type str');
    t.end();
  });

  test('package.json is setup correctly', function (t) {
    var pkg = readSyncJson('./package.json');
    t.is(pkg.name, 'transformer.' + mod.src.id, 'pkg.name');
    t.is(pkg.transformer, 'transformer.jsonld', 'pkg.transformer');
    t.is(pkg.scripts.test, 'node test.js', 'pkg.test');
    t.ok(_.contains(pkg.keywords, 'transformer'), 'pkg.keywords 1');
    t.ok(_.contains(pkg.keywords, 'transformer-' + mod.src.type), 'pkg.keywords 2');
    t.end();
  });

  test('transformer.jsonld is setup correctly', function (t) {
    var tj = readSyncJson('./transformer.jsonld');
    t.is(tj["@context"], Object.contextUrl, 'context url');
    t.is(tj.type, mod.src.type, 'type is conversion');
    t.is(tj.id, mod.src.id, 'id matches');
    t.is(tj.description, mod.src.description, 'description matches');
    t.deepEquals(tj, mod.src, 'whole src matches');
    t.end();
  });

  // return test in case user wants to run own tests too.
  return test;
}

T.type = function(type) {
  var test = T.object(type);

  test('type object is well formed', function (t) {
    t.is(type.type, Type, 'type obj');
    t.is(type.src.type, 'type', 'type src');
    t.ok(type.src.schema, 'src has schema');
    t.ok(type instanceof Type, 'is Type');
    t.end();
  });

  return test;
}

T.conversion = function(conv, io) {
  var test = T.object(conv);

  test('conversion object is well formed', function (t) {
    t.is(conv.type, Conversion, 'type obj');
    t.is(conv.src.type, 'conversion', 'type src');
    t.ok(_.isFunction(conv), 'is function');
    t.ok(_.isFunction(conv.convert), 'has convert function');
    t.ok(conv.convert.async === conv.src.async, 'async 1');
    t.ok(conv.async === conv.src.async, 'async 2');
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
