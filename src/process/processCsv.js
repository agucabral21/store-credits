const dotenv = require('dotenv');
dotenv.config();
const { db_connect } = require('../sequelize');
const ClientService = require('../services/ClientService');
const StoreService = require('../services/StoreService');
const CreditsService = require('../services/CreditsService');

const fs = require('fs');
const stream = require('stream');
const { PushToDB } = require('./pushToDB');
const { parse } = require('csv-parse');

let file = '/home/agu/projects/store-credits/src/process/test.csv';

const add = async (body) => {
  try {
    const { storeName, clientMail, amount } = body;

    const client = await ClientService.findOrCreate({ mail: clientMail });
    const store = await StoreService.findOrCreate({ name: storeName });

    const filters = {
      storeId: store.id,
      clientId: client.id,
    };

    const credits = await CreditsService.updateCredits(filters, amount);
    if (credits == null) {
      console.log('error');
    }
  } catch (err) {
    console.log('add ErrorLog');
    console.log(err);
  }
};

db_connect()
  .then(() => {
    fs.createReadStream(file)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', async function (row) {
        let data = { clientMail: row[0], storeName: row[1], amount: parseInt(row[2]) };
        await add(data);
      })
      .on('end', function () {
        console.log('finished');
      })
      .on('error', function (error) {
        console.log(error.message);
      });
  })
  .catch((error) => {
    console.log('Unable to connect to the database');
    console.log(error.message);
  });

/*
try {
  let readable = fs.createReadStream('/home/agu/projects/store-credits/src/process/test.csv');
  readable.pipe(new PushToDB());
} catch (err) {
  console.log(err);
}
*/
