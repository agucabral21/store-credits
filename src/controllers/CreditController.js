const ClientService = require('../services/ClientService');
const StoreService = require('../services/StoreService');
const CreditsService = require('../services/CreditsService');
const { errorResponse } = require('../utils');

class CreditController {
  static async updateCredits(req, res, next) {
    try {
      const body = req.body;
      const { storeName, clientMail, amount } = body;

      const client = await ClientService.findOrCreate({ mail: clientMail });
      const store = await StoreService.findOrCreate({ name: storeName });

      const filters = {
        storeId: store.id,
        clientId: client.id,
      };

      const credits = await CreditsService.updateCredits(filters, amount);
      if (credits == null) {
        return res.status(404).send();
      }

      const ret = {
        storeName,
        clientMail,
        amount: credits.amount,
      };

      return res.status(200).send(ret);
    } catch (err) {
      return res.status(500).send(errorResponse(err.message));
    }
  }

  static async getCredits(req, res, next) {
    try {
      const clientMail = req.query.client;
      const storeName = req.query.store;

      const client = await ClientService.get({ mail: clientMail });
      if (!client) {
        return res.status(404).send(errorResponse('There is no such client'));
      }
      const store = await StoreService.get({ name: storeName });
      if (!store) {
        return res.status(404).send(errorResponse('There is no such store'));
      }

      const filters = {
        storeId: store.id,
        clientId: client.id,
      };

      const credits = await CreditsService.getCredits(filters);

      const ret = {
        storeName: storeName,
        clientMail: clientMail,
        amount: credits.amount,
      };
      return res.status(200).send(ret);
    } catch (err) {
      return res.status(500).send(errorResponse(err.message));
    }
  }
}

module.exports = CreditController;
