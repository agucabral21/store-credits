const dotenv = require('dotenv');
const envFile = process.env.ENV === 'TEST' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

const { sequelize, db_connect } = require('../sequelize');
const StoreService = require('../services/StoreService');

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

describe('Test for Store Service.', () => {
  test('.add() -> should add store', async () => {
    let data = {
      name: 'A',
    };
    let store = await StoreModel.findOne({ where: data });
    expect(store).toBe(null);

    let addStore = await StoreService.add(data);

    store = await StoreModel.findOne({ where: data });
    expect(store.name).toBe(data.name);
  });

  test('.add() ->  should error for duplicate store', async () => {
    try {
      let data = {
        name: 'A',
      };
      let addStore = StoreModel.create(data);

      let addExistingStore = await StoreService.add(data);
      store = await StoreModel.findOne({ where: data });
    } catch (err) {
      expect(err.errors[0].message).toBe('name must be unique');
    }
  });

  test('.findOrCreate() -> should return a new Store', async () => {
    let data = {
      name: 'A',
    };
    let store = await StoreModel.findOne({ where: data });
    expect(store).toBe(null);

    let getStore = await StoreService.findOrCreate(data);

    store = await StoreModel.findOne({ where: data });
    expect(store.name).toBe(data.name);
  });

  test('.findOrCreate() ->  should return existing Store ', async () => {
    let data = {
      name: 'A',
    };
    let addStore = await StoreModel.create(data);
    let count = await StoreModel.count();
    expect(count).toBe(1);
    let store = await StoreService.findOrCreate(data);
    expect(store.name).toBe(data.name);
    count = await StoreModel.count();
    expect(count).toBe(1);
  });

  test('.get() ->  should return existing Store ', async () => {
    let data = {
      name: 'A',
    };
    let addStore = await StoreModel.create(data);
    let count = await StoreModel.count();
    expect(count).toBe(1);
    let store = await StoreService.get(data);
    expect(store.name).toBe(data.name);
  });

  test('.get() ->  should return empty ', async () => {
    let data = {
      name: 'A',
    };
    let count = await StoreModel.count();
    expect(count).toBe(0);
    let store = await StoreService.get(data);
    expect(store).toBe(null);
  });
});
