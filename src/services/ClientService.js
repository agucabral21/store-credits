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

  static async getOrCreate(filters, data) {
    let client = await Client.findOne({ where: filters });

    if (!client) {
      client = await this.add(data);
    }
    return client;
  }
}

module.exports = ClientService;
