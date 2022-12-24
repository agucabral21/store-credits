const request = require('supertest');
const dotenv = require('dotenv');
const envFile = process.env.ENV === 'TEST' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const app = require('../app');

const { sequelize, db_connect } = require('../sequelize');
const { db_truncate } = require('./utils');

beforeAll(async () => {
  await db_connect();
});

afterAll(async () => {
  await db_truncate(sequelize);
  await sequelize.close();
});

describe('Test CreditController.', () => {
  test('It should add credit correctly.', (done) => {
    let body = {
      storeName: 'b',
      clientMail: 'agucabral@gmail.com',
      amount: 500,
    };
    request(app)
      .put('/credits')
      .set('Accept', 'application/json')
      .send(body)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
