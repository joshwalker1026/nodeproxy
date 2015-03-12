var https = require('https'),
    http = require('http'),
    util = require('util'),
    url  = require('url'),
    fs   = require('fs'),
    path = require('path'),
    colors = require('colors'),
    httpProxy = require('http-proxy'),
    httpsProxy = require('http-proxy'),
    fixturesDir = '/Users/Joshwalker/node_modules/httpp-proxy/test/fixtures/',
    httpsOpts = {
      key: fs.readFileSync(path.join(fixturesDir, 'agent2-key.pem'), 'utf8'),
      cert: fs.readFileSync(path.join(fixturesDir, 'agent2-cert.pem'), 'utf8')
    };
    
// //
// // Create the target HTTPS server 
// //
// https.createServer(httpsOpts, function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('hello https\n');
// 	res.end();
// }).listen(9010);

//
// Create the proxy server listening on port 443
//
// httpProxy.createServer(function(req, res, proxy) {
//   var urlObj = url.parse(req.url);

//   req.headers.host  = urlObj.host;
//   req.url           = urlObj.path;

//   proxy.proxyRequest(req, res, {
//     host    : 'http://elasticsearch-private.bugs.scl3.mozilla.com',
//     port    : 9200,
//     enable  : { xforward: true }
//   });
// }).listen(9200), function () {
//   console.log("Waiting for requests...");
// });

httpProxy.createServer({
    target: 'http://elasticsearch-private.bugs.scl3.mozilla.com:9200',
    enable  : { xforward: true }
}).listen(9200);



httpsProxy.createServer({
  ssl: httpsOpts,
  target: 'https://esfrontline.bugzilla.mozilla.org:443',
  secure: true
}).listen(9010);

util.puts('https proxy server'.blue + ' started '.green.bold + 'on port '.blue + '9010'.yellow);
//util.puts('https server '.blue + 'started '.green.bold + 'on port '.blue + '9010 '.yellow);