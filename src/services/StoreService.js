const { sequelize } = require('../sequelize');
const { Store } = sequelize.models;

class StoreService {
  static async get(data) {
    let store = await Store.findOne({ where: data });
    return store;
  }

  static async add(data) {
    const store = await Store.create(data);
    return store;
  }

  static async getOrCreateByName(data) {
    let store = await Store.findOne({ where: data });
    if (!store) {
      store = await Store.create(data);
    }
    return store;
  }
}

module.exports = StoreService;
