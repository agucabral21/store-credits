const dotenv = require('dotenv');
//const envFile = process.env.ENV === 'TEST' ? 'TEST.env' : '.env';
dotenv.config({ path: '.env' });

const { sequelize, db_connect } = require('../sequelize');
const ClientService = require('../services/ClientService');

const ClientModel = sequelize.models.Client;

beforeAll(async () => {
  await db_connect();
});

beforeEach(async () => {
  await ClientModel.destroy({
    truncate: { cascade: true },
  });
});

afterAll(async () => {
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

    let getClient = await ClientService.getOrCreate(data, data);

    client = await ClientModel.findOne({ where: data });
    expect(client.mail).toBe(data.mail);
  });

  test('.getOrCreate() ->  should return existing Client ', async () => {
    let data = {
      mail: 'test@test.com',
    };
    let filters = data;
    let addClient = await ClientModel.create(data);
    let count = await ClientModel.count();
    expect(count).toBe(1);
    let client = await ClientService.getOrCreate(data, data);
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
