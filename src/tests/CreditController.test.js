const request = require('supertest');
const dotenv = require('dotenv');
const envFile = process.env.ENV === 'TEST' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const app = require('../app');

const { sequelize, db_connect } = require('../sequelize');
const { db_truncate } = require('./utils');

const ClientModel = sequelize.models.Client;

beforeAll(async () => {
  await db_connect();
});

beforeEach(async () => {
  await db_truncate(sequelize);
});

afterAll(async () => {
  await db_truncate(sequelize);
  await sequelize.close();
});

describe('Testing Credit Endpoints.', () => {
  test('It should return 404 for not found', (done) => {
    let queryParams = {
      store: 'aaa',
      client: 'eee@gmail.com',
    };
    request(app)
      .get('/credits')
      .query(queryParams)
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });

  test('It should find credits.', (done) => {
    let queryParams = {
      store: 'b',
      client: 'agucabral@gmail.com',
    };
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
        expect(response.body.data.amount).toBe(body.amount);
        expect(response.body.data.storeName).toBe(body.storeName);
        expect(response.body.data.clientMail).toBe(body.clientMail);
        request(app)
          .get('/credits')
          .query(queryParams)
          .set('Accept', 'application/json')
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.data[0].storeName).toBe(body.storeName);
            done();
          });
      });
  });

  test('It should add new credit correctly.', (done) => {
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
        expect(response.body.data.amount).toBe(body.amount);
        expect(response.body.data.storeName).toBe(body.storeName);
        expect(response.body.data.clientMail).toBe(body.clientMail);
        done();
      });
  });

  test('It should add and update credits correctly and alert of not allowed discount.', (done) => {
    let firstAmount = 500;
    let secondAmount = 200;
    let thirdAmount = -300;
    let fourthAmount = -800;

    let body = {
      storeName: 'b',
      clientMail: 'agucabral@gmail.com',
      amount: firstAmount,
    };
    request(app)
      .put('/credits')
      .set('Accept', 'application/json')
      .send(body)
      .then((response) => {
        expect(response.body.data.amount).toBe(firstAmount);
        expect(response.body.data.storeName).toBe(body.storeName);
        expect(response.body.data.clientMail).toBe(body.clientMail);

        let totalAmount = firstAmount + secondAmount;
        body.amount = secondAmount;

        request(app)
          .put('/credits')
          .set('Accept', 'application/json')
          .send(body)
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.data.amount).toBe(totalAmount);
            expect(response.body.data.storeName).toBe(body.storeName);
            expect(response.body.data.clientMail).toBe(body.clientMail);

            totalAmount = firstAmount + secondAmount + thirdAmount;
            body.amount = thirdAmount;

            request(app)
              .put('/credits')
              .set('Accept', 'application/json')
              .send(body)
              .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.body.error).toBe(false);
                expect(response.body.data.amount).toBe(totalAmount);
                expect(response.body.data.storeName).toBe(body.storeName);
                expect(response.body.data.clientMail).toBe(body.clientMail);

                body.amount = fourthAmount;

                request(app)
                  .put('/credits')
                  .set('Accept', 'application/json')
                  .send(body)
                  .then((response) => {
                    expect(response.statusCode).toBe(500);
                    done();
                  });
              });
          });
      });
  });
});
