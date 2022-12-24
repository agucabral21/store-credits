const dotenv = require('dotenv');
const envFile = process.env.ENV === 'TEST' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const { sequelize, db_connect } = require('../sequelize');
const CreditService = require('../services/CreditsService');

const CreditsModel = sequelize.models.Credits;
const ClientModel = sequelize.models.Client;
const StoreModel = sequelize.models.Store;

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

describe('Test for Credit Service.', () => {
  test('.updateCredits() ->  should create new credits ', async () => {
    let amount = 500;
    let [client, client_created] = await ClientModel.findOrCreate({ where: { mail: 'test@test.com' } });
    let [store, store_created] = await StoreModel.findOrCreate({ where: { name: 'A' } });

    let filters = {
      storeId: store.id,
      clientId: client.id,
    };

    let addCredits = await CreditService.updateCredits(filters, amount);

    let credits = await CreditsModel.findOne({ where: filters });

    expect(credits.amount).toBe(amount);
  });

  test('.updateCredits() ->  should update existing credits ', async () => {
    let firstAmount = 500;
    let secondAmount = 200;
    let [client, client_created] = await ClientModel.findOrCreate({ where: { mail: 'test@test.com' } });
    let [store, store_created] = await StoreModel.findOrCreate({ where: { name: 'A' } });

    let filters = {
      storeId: store.id,
      clientId: client.id,
    };

    let credits = await CreditsModel.create({ ...filters, amount: firstAmount });

    expect(credits.amount).toBe(firstAmount);

    let addCredits = await CreditService.updateCredits(filters, secondAmount);

    credits = await CreditsModel.findOne({ where: filters });

    expect(credits.amount).toBe(firstAmount + secondAmount);
  });
});
