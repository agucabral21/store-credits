async function runConfig(sequelize) {
  const { Client, Credits, Store } = sequelize.models;

  Client.hasMany(Credits, { as: 'clientCredits', foreignKey: 'clientId' });
  Credits.belongsTo(Client, { as: 'clientCredits', foreignKey: 'clientId' });
  Store.hasMany(Credits, { as: 'storeCredits', foreignKey: 'storeId' });
  Credits.belongsTo(Store, { as: 'storeCredits', foreignKey: 'storeId' });

  await sequelize.sync();
}

module.exports = { runConfig };
