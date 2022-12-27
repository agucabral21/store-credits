const ClientService = require('../services/ClientService');
const StoreService = require('../services/StoreService');
const CreditsService = require('../services/CreditsService');
const { errorResponse, okResponse } = require('../utils');

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

      return res.status(200).send(okResponse(ret));
    } catch (err) {
      return res.status(500).send(errorResponse(err.message));
    }
  }

  static async getCredits(req, res, next) {
    try {
      const clientMail = req.query.client;
      const storeName = req.query.store;

      let filters = {};
      if (clientMail) filters['$clientCredits.mail$'] = clientMail;
      if (storeName) filters['$storeCredits.name$'] = storeName;

      let result = await CreditsService.findAll({ ...filters });
      if (result.length === 0) {
        return res.status(404).send();
      }
      let parsed = result.map((elem) => {
        return {
          amount: elem.amount,
          clientMail: elem['clientCredits.mail'],
          storeName: elem['storeCredits.name'],
        };
      });

      return res.status(200).send(okResponse(parsed));
    } catch (err) {
      return res.status(500).send(errorResponse(err.message));
    }
  }
}

module.exports = CreditController;
