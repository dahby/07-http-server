'use strict';

const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser');
const faker = require('faker');

const server = module.exports = {};

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then((parsedRequest) => {
      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<body><header><nav><ul><li><a href="/cowsay">cowsay</a></li></ul></nav></header><main>Here there be a description</main></body>');
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/cowsay') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let msg = parsedRequest.url.query.text;
        if (!parsedRequest.url.query.text) {
          msg = faker.random.word();
        }
        const cowsayMessage = cowsay.say({ text: msg });
        res.write(`<body><h1> cowsay </h1><pre>${cowsayMessage}</pre></body>`);
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/api/cowsay') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        let msg = parsedRequest.url.query.text;
        if (!parsedRequest.url.query.text) {
          msg = faker.random.word();
        }
        res.write(JSON.stringify({ text: msg }));
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'POST' && parsedRequest.url.pathname === '/cowsay') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(parsedRequest.body));
        res.end();
        return undefined;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('NOT FOUND');
      res.end();
      return undefined;
    })
    .catch((err) => {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('BAD REQUEST', err);
      res.end();
      return undefined;
    });
});


server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
