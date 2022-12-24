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

  static async findOrCreate(data) {
    let [store, created] = await Store.findOrCreate({ where: data });
    if (created) console.log('A new store was created with', data);
    return store;
  }
}

module.exports = StoreService;
