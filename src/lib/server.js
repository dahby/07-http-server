'use strict';

const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser');

const server = module.exports = {};

const app = http.createServer((req, res) => {
  bodyParser(req).then((parsedRequest) => {
    if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
    }
  });
});


server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
