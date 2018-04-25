'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
// const cowsay = require('cowsay');

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('VALID requests to the API', () => {
  describe('GET /', () => {
    test('response should have status 200', () => {
      return superagent.get(':5000/').then((res) => {
        console.log(res.body);
        expect(res.status).toEqual(200);
      });
    });
  });
});
