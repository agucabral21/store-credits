const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

//Export a function that defines the model
module.exports = (sequelize) => {
  sequelize.define('credits', {
    client_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    store_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
  });
};
