const request = require('supertest');
const app = require('../app');

describe('Test status endpoint.', () => {
  test('It should show service status.', (done) => {
    request(app)
      .get('/wrongUrl')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });
});
