'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');
const faker = require('faker');

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('VALID requests to the API', () => {
  describe('GET /', () => {
    test('response should have status 200', () => {
      return superagent.get(':5000/').then((res) => {
        expect(res.status).toEqual(200);
      });
    });
  });
  describe('GET /cowsay', () => {
    const mockCow = cowsay.say({ text: 'This test will pass' });
    const mockHtml = `<body><h1> cowsay </h1><pre>${mockCow}</pre></body>`;
    test('should respond with cowsay html', () => {
      return superagent.get(':5000/cowsay')
        .query({ text: 'This test will pass' })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(mockHtml);
        });
    });
  });
  describe('GET /api/cowsay', () => {
    const random = faker.random.words();
    test('Should respond with cowsay json', () => {
      return superagent.get(':5000/api/cowsay')
        .query({ text: random })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(JSON.parse(res.text).text).toEqual(random);
        });
    });
  });
  // describe('POST /api/cowsay', () => {
  //   test('Should respond with POST request', () => {
  //     return superagent.post(':5000/api/cowsay')
  //       .send({ text: 'This test will pass' })
  //       .then((res) => {
  //         expect(res.body.text).toEqual('This test will pass');
  //         expect(res.status).toEqual(200);
  //       });
  //   });
  // });
});
describe('Invalid requests to the API', () => {
  describe('GET /404', () => {
    test('response should have status 404', () => {
      return superagent.get(':5000/error')
        .query('error')
        .then(() => {})
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });
});
