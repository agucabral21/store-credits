const dotenv = require('dotenv');
dotenv.config();

const { sequelize, db_connect } = require('../sequelize');
const { Client, Store, Credits } = sequelize.models;

const { parse } = require('csv-parse');
const fs = require('fs');

//This function will return a dataArray containing arrays of 3 values corresponding each line of the csv
async function parseData(csvFilePath) {
  let dataArray = [];
  const process = await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', (data) => {
        // Push each row of data to the array
        let [clientMail, storeName, amount] = data;
        dataArray.push({ clientMail, storeName, amount });
      })
      .on('end', () => {
        // Resolve the promise when the CSV has been fully read
        resolve(dataArray);
      })
      .on('error', (error) => {
        // Reject the promise if there is an error reading the CSV
        reject(error);
      });
  });
  //This returns one row per each clientMail-storeName
  //Used for reducing the array and have just one update per store-client
  //not used for now for rollback possible conflicts
  /*let ret = dataArray.reduce((acc, curr) => {
    let { clientMail, storeName, amount } = curr;
    const key = `${clientMail}-${storeName}`;
    if (!acc[key]) {
      acc[key] = { clientMail: clientMail, storeName: storeName, amount: 0 };
    }
    acc[key].amount += parseInt(amount);
    return acc;
  }, {});
  */
  return dataArray;
}

async function loadCSVtoDB(csvFilePath) {
  // Read the CSV file and parse its contents
  const dataArray = await parseData(csvFilePath);
  // Start a transaction
  const transaction = await sequelize.transaction();

  try {
    for (const row in dataArray) {
      let { clientMail, storeName, amount } = dataArray[row];

      //First findOrCreate store and client
      let [store, store_created] = await Store.findOrCreate({
        where: { name: storeName },
        transaction,
      });

      let [client, client_created] = await Client.findOrCreate({
        where: { mail: clientMail },
        transaction,
      });

      //Second findOrCreate credits with 0 value and then run increment query for credit amount
      if (store && client) {
        let where = {
          storeId: store.id,
          clientId: client.id,
        };

        let [credit, credit_created] = await Credits.findOrCreate({
          where,
          defaults: { amount },
          transaction,
        });

        if (!credit_created) {
          await credit.increment('amount', { by: amount, transaction });
        }
        console.log('Inserting Credits ', where, amount);
      }
    }

    await transaction.commit();
  } catch (error) {
    console.log('Rolling back transaction');
    console.log(error.errors[0].message, error.errors[0].instance.dataValues);
    await transaction.rollback();
  } finally {
    await sequelize.close();
  }
}

db_connect()
  .then(async () => {
    if (!process.argv[2]) {
      console.log('Must pass arg value for csv full path');
      await sequelize.close();
    } else {
      let file = process.argv[2];
      loadCSVtoDB(file);
    }
  })
  .catch((error) => {
    console.log(error);
  });
