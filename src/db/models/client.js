const { DataTypes } = require('sequelize');
const { sequelize } = require('../sequelize');

//Export a function that defines the model
module.exports = (sequelize) => {
  sequelize.define('client', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    mail: {
      type: DataTypes.CHAR,
    },
  });
};
