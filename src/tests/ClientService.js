const dotenv = require('dotenv');
const envFile = process.env.ENV === 'TEST' ? 'TEST.env' : '.env';
dotenv.config({ path: envFile });

const { sequelize, db_connect, db_disconnect } = require('../sequelize');
const ClientService = require('../services/ClientService');

const Client = sequelize.Client;

beforeAll(async () => {
  await db_connect();
});

afterAll(async () => {
  await db_disconnect();
});

describe('Test for Client Service.', () => {
  test('It should save a client.', async (done) => {
    const clientMail = 'test@test.com';

    let client = await Client.findOne({ mail: clientMail });

    expect(client).toBe(null);

    await ClientService.add({ mail: clientMail });

    client = await Client.findOne({ mail: clientMail });

    expect(client.mail).toBe(clientMail);

    done();
  });
});
