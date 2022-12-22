const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

//Export a function that defines the model
module.exports = (sequelize) => {
  sequelize.define('store', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.CHAR,
    },
  });
};
