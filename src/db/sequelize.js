const Sequelize = require('sequelize');

const host = process.env.DB_HOST || 'localhost';
const dbName = process.env.DB_NAME || 'credits';
const user = process.env.DB_USER || false;
const pass = process.env.DB_PASSWORD || false;
const dialect = process.env.DB_DIALECT || mysql;

const sequelize = new Sequelize(dbName, user, pass, {
  host,
  dialect,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = { Sequelize, sequelize };
