function runConfig(sequelize) {
  const { Client, Credits, Store } = sequelize.models;

  Client.belongsToMany(Store, { as: 'clientId', through: Credits, foreignKey: 'clientId' });
  Store.belongsToMany(Client, { as: 'storeId', through: Credits, foreignKey: 'storeId' });

  Store.sync();
  Client.sync();
  Credits.sync();
}

module.exports = { runConfig };
