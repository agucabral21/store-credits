const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const { runConfig } = require('./config');

const host = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'storeCredits';
const user = process.env.DB_USER || false;
const pass = process.env.DB_PASSWORD || false;
const dialect = process.env.DB_DIALECT || 'mysql';

const sequelize = new Sequelize(dbName, user, pass, {
  host,
  dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
});

const modelDefiners = [require('./models/credits.model'), require('./models/client.model'), require('./models/store.model')];

//Creating invocating definition of models
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize, DataTypes);
}

runConfig(sequelize);

const db_connect = () =>
  new Promise(async (resolve, reject) => {
    console.log(`Checking database connection...`);
    try {
      await sequelize.authenticate();
      console.log('Database connection OK!');
    } catch (error) {
      reject(error);
    }
    resolve();
  });

module.exports = { sequelize, db_connect };
