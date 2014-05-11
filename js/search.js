// based on https://github.com/tmpvar/nps
var http = require('http');

module.exports = Search;

function Search(query, callback) {

  Request(query, function(err, res) {
    if (err) return callback(err);

    var body = '';
    res.setEncoding('utf8');

    res.on('data', function(chunk) {
      body+=chunk;
    });

    res.on('end', function() {
      try {
        var modules = [];
        var parsed = JSON.parse(body);
        parsed.results && parsed.results.forEach(function(p) {
          modules.push(p.name);
        });
        callback(null, modules);

      } catch (e) {
        callback(e);
      }
    });
  })

  return new Error('Use callback.')
}

function Request(query, callback) {
  query = query || 'keywords:"transformer-type","transformer-conversion"'

  var params = {
    hostname: 'npmsearch.com',
    path: '/query?fl=name&rows=200&sort=rating+desc&q=' + escape(query)
  };

  var req = http.request(params, function(res) {
    callback(null, res);
  })

  req.on('error', function(e) {
    callback(e);
  });

  req.end('\n');
  return new Error('Use callback.')
}
