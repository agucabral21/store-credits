async function runConfig(sequelize) {
  const { Client, Credits, Store } = sequelize.models;

  Client.belongsToMany(Store, { as: 'stores', through: Credits, foreignKey: 'clientId' });
  Store.belongsToMany(Client, { as: 'clients', through: Credits, foreignKey: 'storeId' });
  Credits.belongsTo(Store, { as: 'store', foreignKey: 'clientId' });
  Credits.belongsTo(Client, { as: 'client', foreignKey: 'storeId' });

  await sequelize.sync();
}

module.exports = { runConfig };
