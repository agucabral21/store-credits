async function runConfig(sequelize) {
  const { Client, Credits, Store } = sequelize.models;

  Client.belongsToMany(Store, { as: 'clientId', through: Credits, foreignKey: 'clientId' });
  Store.belongsToMany(Client, { as: 'storeId', through: Credits, foreignKey: 'storeId' });

  await sequelize.sync();
}

module.exports = { runConfig };
