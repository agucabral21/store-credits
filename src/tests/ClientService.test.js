const dotenv = require('dotenv');
const envFile = process.env.ENV === 'TEST' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const { sequelize, db_connect } = require('../sequelize');
const ClientService = require('../services/ClientService');

const ClientModel = sequelize.models.Client;

const { db_truncate } = require('./utils');

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

describe('Test for Client Service.', () => {
  test('.add() -> should add client', async () => {
    let data = {
      mail: 'test@test.com',
    };
    let client = await ClientModel.findOne({ where: data });
    expect(client).toBe(null);

    let addClient = await ClientService.add(data);

    client = await ClientModel.findOne({ where: data });
    expect(client.mail).toBe(data.mail);
  });

  test('.add() ->  should error for duplicate client', async () => {
    try {
      let data = {
        mail: 'test@test.com',
      };
      let addClient = ClientModel.create(data);

      let addExistingClient = await ClientService.add(data);
      client = await ClientModel.findOne({ where: data });
    } catch (err) {
      expect(err.errors[0].message).toBe('mail must be unique');
    }
  });

  test('.getOrCreate() -> should return a new Client', async () => {
    let data = {
      mail: 'test@test.com',
    };
    let client = await ClientModel.findOne({ where: data });
    expect(client).toBe(null);
    let count = await ClientModel.count();
    expect(count).toBe(0);

    let getClient = await ClientService.findOrCreate(data);

    client = await ClientModel.findOne({ where: data });
    expect(client.mail).toBe(data.mail);
  });

  test('.getOrCreate() ->  should return existing Client ', async () => {
    let data = {
      mail: 'test@test.com',
    };
    let addClient = await ClientModel.create(data);
    let count = await ClientModel.count();
    expect(count).toBe(1);
    let client = await ClientService.findOrCreate(data);
    expect(client.mail).toBe(data.mail);
    count = await ClientModel.count();
    expect(count).toBe(1);
  });

  test('.get() ->  should return existing Client ', async () => {
    let data = {
      mail: 'test@test.com',
    };
    let addClient = await ClientModel.create(data);
    let count = await ClientModel.count();
    expect(count).toBe(1);
    let client = await ClientService.get(data);
    expect(client.mail).toBe(data.mail);
  });

  test('.get() ->  should return empty ', async () => {
    let data = {
      mail: 'test@test.com',
    };
    let count = await ClientModel.count();
    expect(count).toBe(0);
    let client = await ClientService.get(data);
    expect(client).toBe(null);
  });
});
