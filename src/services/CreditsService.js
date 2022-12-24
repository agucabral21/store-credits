const { sequelize } = require('../sequelize');
const { Credits } = sequelize.models;

const ClientService = require('./ClientService');
const StoreService = require('./StoreService');

class CreditsService {
  static async updateCredits(filters, amount) {
    let credits = await Credits.findOne({ where: filters });

    if (credits !== null) {
      credits.amount += amount;
      await credits.save();
    } else {
      let data = { ...filters, amount };
      credits = Credits.build(data);
      credits = await credits.save();
    }
    return credits;
  }

  static async getCredits(filters) {
    let credits = await Credits.findOne({ where: filters });
    return credits;
  }
}

module.exports = CreditsService;
