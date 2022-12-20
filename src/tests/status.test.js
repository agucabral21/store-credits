const request = require('supertest');
const app = require('../app');

describe('Test status endpoint.', () => {
  test('It should show service status.', (done) => {
    request(app)
      .get('/status')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
