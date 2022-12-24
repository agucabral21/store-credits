const { sequelize } = require('../sequelize');
const { Client } = sequelize.models;

class ClientService {
  static async get(data) {
    let client = await Client.findOne({ where: data });
    return client;
  }

  static async add(data) {
    const client = await Client.create(data);
    return client;
  }

  static async findOrCreate(data) {
    let [create, created] = await Client.findOrCreate({ where: data });
    if (created) console.log('A new create was created with', data);
    return create;
  }
}

module.exports = ClientService;
